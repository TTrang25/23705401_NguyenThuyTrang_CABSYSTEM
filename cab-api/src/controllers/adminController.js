const db = require('../data/store');
const { writeAuditLog } = require('../utils/helpers');

/** UC23 — Quản lý khách hàng */
function listCustomers(req, res) {
  return res.json(db.customers);
}

/** UC24 — Quản lý tài xế */
function listDrivers(req, res) {
  return res.json(db.drivers);
}

/** UC25 — Quản lý phương tiện */
function listVehicles(req, res) {
  return res.json(db.vehicles);
}

/** UC26 — Quản lý chuyến đi (toàn bộ) */
function listTrips(req, res) {
  return res.json(db.trips);
}

/** UC27 — Giám sát các chuyến đang diễn ra */
function listOngoingTrips(req, res) {
  const ongoing = db.trips.filter((t) =>
    ['requested', 'finding_driver', 'assigned', 'arrived', 'picked_up', 'in_progress'].includes(t.status)
  );
  return res.json(ongoing);
}

/** UC28 — Kiểm tra trạng thái tài xế */
function listDriverStatus(req, res) {
  return res.json(db.drivers.map((d) => ({ id: d.id, name: d.name, status: d.status, lastLocation: d.lastLocation || null })));
}

/** UC29 — Xử lý sự cố chuyến đi (đánh dấu chuyến lỗi / gán lại) */
function resolveIncident(req, res) {
  const trip = db.trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const { resolution, note } = req.body; // e.g. resolution: 'reassign' | 'cancelled' | 'refunded'
  trip.incident = { resolution: resolution || 'reviewed', note: note || null, staffUserId: req.user.id, time: new Date().toISOString() };

  writeAuditLog(req.user.id, `RESOLVE_INCIDENT ${trip.id} -> ${resolution}`);
  return res.json(trip);
}

/** UC30 — Tra cứu lịch sử giao dịch / thanh toán */
function listTransactions(req, res) {
  return res.json(db.payments);
}

/** UC31 — Xem báo cáo thống kê (BR10/BG10): số chuyến, doanh thu, tỷ lệ hoàn thành/hủy, hiệu quả tài xế */
function getReports(req, res) {
  const totalTrips = db.trips.length;
  const completed = db.trips.filter((t) => t.status === 'completed').length;
  const cancelled = db.trips.filter((t) => t.status === 'cancelled').length;
  const revenue = db.payments.filter((p) => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);

  const driverStats = db.drivers.map((d) => {
    const assignments = db.assignments.filter((a) => a.driverId === d.id);
    const completedTrips = assignments.filter((a) => {
      const trip = db.trips.find((t) => t.id === a.tripId);
      return a.status === 'accepted' && trip && trip.status === 'completed';
    }).length;
    return { driverId: d.id, name: d.name, completedTrips };
  });

  return res.json({
    totalTrips,
    completed,
    cancelled,
    completionRate: totalTrips ? +(completed / totalTrips).toFixed(2) : 0,
    cancellationRate: totalTrips ? +(cancelled / totalTrips).toFixed(2) : 0,
    revenue,
    driverStats,
  });
}

/** UC32 — Quản lý tài khoản và phân quyền (BR10/BR24/NFR06) */
function updateUserRole(req, res) {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { role, status } = req.body;
  if (role) {
    if (!['customer', 'driver', 'staff'].includes(role)) {
      return res.status(400).json({ error: 'role must be customer, driver, or staff' });
    }
    user.role = role;
  }
  if (status) {
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ error: 'status must be active or suspended' });
    }
    user.status = status;
  }

  writeAuditLog(req.user.id, `UPDATE_USER_ROLE ${user.id} -> role=${user.role}, status=${user.status}`);
  return res.json({ id: user.id, username: user.username, role: user.role, status: user.status });
}

/** BR11/BR26/NFR07 — tra cứu audit log */
function listAuditLogs(req, res) {
  return res.json(db.auditLogs.sort((a, b) => new Date(b.time) - new Date(a.time)));
}

module.exports = {
  listCustomers,
  listDrivers,
  listVehicles,
  listTrips,
  listOngoingTrips,
  listDriverStatus,
  resolveIncident,
  listTransactions,
  getReports,
  updateUserRole,
  listAuditLogs,
};
