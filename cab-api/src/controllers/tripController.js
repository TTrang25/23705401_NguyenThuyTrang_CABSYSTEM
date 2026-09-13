const { v4: uuid } = require('uuid');
const db = require('../data/store');
const { writeAuditLog, createNotification, distanceKm, calculateFare } = require('../utils/helpers');
const { findMyCustomer } = require('./customerController');
const { findMyDriver } = require('./driverController');

/**
 * BR02/BR03/FR03/FR04 — tìm & ưu tiên tài xế phù hợp/gần khách hàng nhất,
 * loại các tài xế đã được mời và bị từ chối/timeout cho chuyến này (BR03/FR05).
 */
function findBestDriver(pickup, excludeDriverIds = []) {
  const candidates = db.drivers.filter(
    (d) => d.status === 'available' && d.lastLocation && !excludeDriverIds.includes(d.id)
  );
  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const da = distanceKm(pickup.latitude, pickup.longitude, a.lastLocation.latitude, a.lastLocation.longitude);
    const db_ = distanceKm(pickup.latitude, pickup.longitude, b.lastLocation.latitude, b.lastLocation.longitude);
    return da - db_;
  });
  return candidates[0];
}

/** Tạo assignment mới (offer) cho 1 tài xế, hoặc thông báo "không tìm được tài xế" (BR04/FR06) */
function offerToDriver(trip, excludeDriverIds = []) {
  const driver = findBestDriver(trip.pickup, excludeDriverIds);
  if (!driver) {
    trip.status = 'no_driver_found';
    createNotification(trip.customerUserId, 'trip_status', 'Không tìm thấy tài xế phù hợp. Vui lòng thử lại sau.');
    return null;
  }

  const assignment = {
    id: uuid(),
    tripId: trip.id,
    driverId: driver.id,
    status: 'offered', // offered -> accepted | rejected | timeout
    offeredAt: new Date().toISOString(),
  };
  db.assignments.push(assignment);
  trip.status = 'finding_driver';

  createNotification(driver.userId, 'trip_request', `Bạn có yêu cầu chuyến mới: ${trip.pickup.address || ''} -> ${trip.destination.address || ''}`);
  return assignment;
}

/** UC04 — Tạo chuyến đi (BR01/FR01/FR02), sau đó tự động chuyển sang tìm tài xế (FR03/FR04) */
function createTrip(req, res) {
  const customer = findMyCustomer(req.user.id);
  if (!customer) return res.status(404).json({ error: 'Customer profile not found' });

  const { pickup, destination, vehicleType } = req.body;

  // AC01/AC02/AC03 — validate đầy đủ điểm đón, điểm đến, loại xe
  if (!pickup || !pickup.latitude || !pickup.longitude) {
    return res.status(400).json({ error: 'pickup {latitude, longitude, address?} is required' });
  }
  if (!destination || !destination.latitude || !destination.longitude) {
    return res.status(400).json({ error: 'destination {latitude, longitude, address?} is required' });
  }
  const validTypes = ['bike', 'car4', 'car7'];
  if (!vehicleType || !validTypes.includes(vehicleType)) {
    return res.status(400).json({ error: `vehicleType must be one of ${validTypes.join(', ')}` });
  }

  const trip = {
    id: uuid(),
    customerUserId: req.user.id,
    pickup,
    destination,
    vehicleType,
    status: 'requested', // requested -> finding_driver -> assigned -> arrived -> picked_up -> in_progress -> completed | cancelled | no_driver_found
    createdAt: new Date().toISOString(),
  };
  db.trips.push(trip);

  const booking = { id: uuid(), customerId: customer.id, tripId: trip.id, vehicleType };
  db.bookings.push(booking);

  writeAuditLog(req.user.id, `CREATE_TRIP ${trip.id}`);

  // FR03/FR04 — tự động tìm & phân công tài xế phù hợp/gần nhất
  const assignment = offerToDriver(trip);

  return res.status(201).json({ trip, booking, assignment });
}

/** UC05 — Theo dõi trạng thái chuyến đi + vị trí tài xế hiện tại (BR09/FR08) */
function getTrip(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const assignment = db.assignments
    .filter((a) => a.tripId === trip.id)
    .sort((a, b) => new Date(b.offeredAt) - new Date(a.offeredAt))[0];

  let driverInfo = null;
  if (assignment && ['accepted'].includes(assignment.status)) {
    const driver = db.drivers.find((d) => d.id === assignment.driverId);
    driverInfo = driver ? { name: driver.name, phone: driver.phone, location: driver.lastLocation || null } : null;
  }

  return res.json({ trip, assignment: assignment || null, driver: driverInfo });
}

/** UC06 — Hủy chuyến (chỉ cho phép trước khi hoàn thành) */
function cancelTrip(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  if (['completed', 'cancelled'].includes(trip.status)) {
    return res.status(409).json({ error: `Cannot cancel a trip with status "${trip.status}"` });
  }

  trip.status = 'cancelled';
  const activeAssignment = db.assignments.find((a) => a.tripId === trip.id && a.status === 'offered');
  if (activeAssignment) activeAssignment.status = 'cancelled';

  writeAuditLog(req.user.id, `CANCEL_TRIP ${trip.id}`);
  return res.json(trip);
}

/** UC18 — Tài xế chấp nhận chuyến */
function acceptTrip(req, res) {
  const driver = findMyDriver(req.user.id);
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const assignment = db.assignments.find((a) => a.tripId === trip.id && a.driverId === driver.id && a.status === 'offered');
  if (!assignment) return res.status(409).json({ error: 'No pending offer for this driver on this trip' });

  assignment.status = 'accepted';
  trip.status = 'assigned';
  driver.status = 'on_trip';

  createNotification(trip.customerUserId, 'trip_status', 'Tài xế đã nhận chuyến của bạn.');
  writeAuditLog(req.user.id, `ACCEPT_TRIP ${trip.id}`);
  return res.json({ trip, assignment });
}

/** UC19 — Tài xế từ chối chuyến -> BR03/FR05: tự động tìm tài xế khác, không cần khách đặt lại */
function rejectTrip(req, res) {
  const driver = findMyDriver(req.user.id);
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const assignment = db.assignments.find((a) => a.tripId === trip.id && a.driverId === driver.id && a.status === 'offered');
  if (!assignment) return res.status(409).json({ error: 'No pending offer for this driver on this trip' });

  assignment.status = 'rejected';
  writeAuditLog(req.user.id, `REJECT_TRIP ${trip.id}`);

  const excludeIds = db.assignments.filter((a) => a.tripId === trip.id).map((a) => a.driverId);
  const nextAssignment = offerToDriver(trip, excludeIds);

  return res.json({ trip, rejectedAssignment: assignment, nextAssignment });
}

/** UC20 / UC22 — Tài xế cập nhật trạng thái chuyến: arrived, picked_up, in_progress, completed */
function updateTripStatus(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const { status } = req.body;
  const allowed = ['arrived', 'picked_up', 'in_progress', 'completed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${allowed.join(', ')}` });
  }

  trip.status = status;
  const statusText = {
    arrived: 'Tài xế đã đến điểm đón.',
    picked_up: 'Tài xế đã đón khách.',
    in_progress: 'Chuyến đi đang diễn ra.',
    completed: 'Chuyến đi đã hoàn thành.',
  };
  createNotification(trip.customerUserId, 'trip_status', statusText[status]);

  if (status === 'completed') {
    const assignment = db.assignments.find((a) => a.tripId === trip.id && a.status === 'accepted');
    if (assignment) {
      const driver = db.drivers.find((d) => d.id === assignment.driverId);
      if (driver) driver.status = 'available';
    }
    // BR06/FR09 — tự động tính cước khi hoàn thành chuyến
    const dist = distanceKm(trip.pickup.latitude, trip.pickup.longitude, trip.destination.latitude, trip.destination.longitude);
    const amount = calculateFare(trip.vehicleType, dist);
    const fare = { id: uuid(), tripId: trip.id, serviceType: trip.vehicleType, amount, distanceKm: Number(dist.toFixed(2)) };
    db.fares.push(fare);
  }

  writeAuditLog(req.user.id, `UPDATE_TRIP_STATUS ${trip.id} -> ${status}`);
  return res.json(trip);
}

/** UC08 — Xem cước phí của chuyến */
function getFare(req, res) {
  const fare = db.fares.find((f) => f.tripId === req.params.id);
  if (!fare) return res.status(404).json({ error: 'Fare not available yet (trip may not be completed)' });
  return res.json(fare);
}

/** UC09 — Thanh toán chuyến đi (tiền mặt hoặc điện tử) — BR07/BR08/FR10/FR11/FR12 */
function payTrip(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  const fare = db.fares.find((f) => f.tripId === trip.id);
  if (!fare) return res.status(409).json({ error: 'Trip must be completed before payment' });

  const { method } = req.body; // 'cash' | 'electronic'
  if (!['cash', 'electronic'].includes(method)) {
    return res.status(400).json({ error: 'method must be "cash" or "electronic"' });
  }

  let status = 'success';
  if (method === 'electronic') {
    // FR11/FR12 — mô phỏng gọi Payment Provider bên ngoài; hệ thống KHÔNG lưu số thẻ/tài khoản (BR08)
    const providerResult = simulatePaymentProvider();
    status = providerResult.success ? 'success' : 'failed';
  }

  const payment = { id: uuid(), tripId: trip.id, amount: fare.amount, method, status };
  db.payments.push(payment);

  // FR13/FR14 — thông báo kết quả, cho phép thử lại nếu thất bại
  createNotification(
    trip.customerUserId,
    'payment_result',
    status === 'success' ? 'Thanh toán thành công.' : 'Thanh toán thất bại. Vui lòng thử lại.'
  );
  writeAuditLog(req.user.id, `PAYMENT ${trip.id} -> ${status}`);

  const httpStatus = status === 'success' ? 201 : 402;
  return res.status(httpStatus).json(payment);
}

function simulatePaymentProvider() {
  // Demo only: 90% success rate to also exercise the failure/retry path (BR09/FR14)
  return { success: Math.random() < 0.9 };
}

/** UC10 — Xem kết quả thanh toán */
function getPayment(req, res) {
  const payment = db.payments.find((p) => p.tripId === req.params.id);
  if (!payment) return res.status(404).json({ error: 'No payment found for this trip' });
  return res.json(payment);
}

/** UC11 — Đánh giá tài xế sau khi hoàn thành chuyến */
function rateTrip(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  if (trip.status !== 'completed') {
    return res.status(409).json({ error: 'Trip must be completed before rating' });
  }

  const { score, comment } = req.body;
  if (typeof score !== 'number' || score < 1 || score > 5) {
    return res.status(400).json({ error: 'score must be a number between 1 and 5' });
  }

  const customer = findMyCustomer(req.user.id);
  const assignment = db.assignments.find((a) => a.tripId === trip.id && a.status === 'accepted');
  const rating = {
    id: uuid(),
    tripId: trip.id,
    customerId: customer.id,
    driverId: assignment ? assignment.driverId : null,
    score,
    comment: comment || null,
  };
  db.ratings.push(rating);

  writeAuditLog(req.user.id, `RATE_TRIP ${trip.id} -> ${score}`);
  return res.status(201).json(rating);
}

module.exports = {
  createTrip,
  getTrip,
  cancelTrip,
  acceptTrip,
  rejectTrip,
  updateTripStatus,
  getFare,
  payTrip,
  getPayment,
  rateTrip,
};
