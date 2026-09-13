const { v4: uuid } = require('uuid');
const db = require('../data/store');
const { writeAuditLog } = require('../utils/helpers');

function findMyDriver(userId) {
  return db.drivers.find((d) => d.userId === userId);
}

/** UC14 (get) */
function getMe(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });
  const vehicle = db.vehicles.find((v) => v.driverId === driver.id) || null;
  return res.json({ ...driver, vehicle });
}

/** UC14 — Cập nhật hồ sơ tài xế */
function updateMe(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });

  const { name, phone } = req.body;
  if (name) driver.name = name;
  if (phone) driver.phone = phone;

  writeAuditLog(req.user.id, 'UPDATE_PROFILE (driver)');
  return res.json(driver);
}

/** UC15 — Cập nhật thông tin phương tiện (BR: mỗi tài xế 1 xe active) */
function upsertVehicle(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });

  const { plateNumber, type } = req.body;
  if (!plateNumber || !type) {
    return res.status(400).json({ error: 'plateNumber and type are required' });
  }

  let vehicle = db.vehicles.find((v) => v.driverId === driver.id);
  if (vehicle) {
    vehicle.plateNumber = plateNumber;
    vehicle.type = type;
  } else {
    vehicle = { id: uuid(), driverId: driver.id, plateNumber, type };
    db.vehicles.push(vehicle);
  }

  writeAuditLog(req.user.id, 'UPDATE_VEHICLE');
  return res.json(vehicle);
}

/** UC16 — Chuyển trạng thái sẵn sàng nhận chuyến */
function updateStatus(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });

  const { status } = req.body; // 'available' | 'unavailable' | 'on_trip' | 'offline'
  const allowed = ['available', 'unavailable', 'on_trip', 'offline'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${allowed.join(', ')}` });
  }
  driver.status = status;

  writeAuditLog(req.user.id, `UPDATE_STATUS -> ${status}`);
  return res.json(driver);
}

/** UC21 — Cập nhật vị trí tài xế (BR09/FR08, phục vụ tìm tài xế + ETA) */
function updateLocation(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });

  const { latitude, longitude } = req.body;
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'latitude and longitude are required' });
  }

  driver.lastLocation = { latitude, longitude };
  const loc = { id: uuid(), driverId: driver.id, latitude, longitude, time: new Date().toISOString() };
  db.locations.push(loc);

  return res.json(loc);
}

/** UC17 — Danh sách các đề nghị chuyến (assignment) đang chờ tài xế phản hồi */
function getMyTripRequests(req, res) {
  const driver = findMyDriver(req.user.id);
  if (!driver) return res.status(404).json({ error: 'Driver profile not found' });

  const pending = db.assignments
    .filter((a) => a.driverId === driver.id && a.status === 'offered')
    .map((a) => ({ assignment: a, trip: db.trips.find((t) => t.id === a.tripId) }));
  return res.json(pending);
}

module.exports = {
  getMe,
  updateMe,
  upsertVehicle,
  updateStatus,
  updateLocation,
  getMyTripRequests,
  findMyDriver,
};
