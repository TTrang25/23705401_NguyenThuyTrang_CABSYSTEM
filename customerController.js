const db = require('../data/store');
const { writeAuditLog } = require('../utils/helpers');

function findMyCustomer(userId) {
  return db.customers.find((c) => c.userId === userId);
}

/** UC03 (get) */
function getMe(req, res) {
  const customer = findMyCustomer(req.user.id);
  if (!customer) return res.status(404).json({ error: 'Customer profile not found' });
  return res.json(customer);
}

/** UC03 — Cập nhật thông tin cá nhân */
function updateMe(req, res) {
  const customer = findMyCustomer(req.user.id);
  if (!customer) return res.status(404).json({ error: 'Customer profile not found' });

  const { name, phone, email } = req.body;
  if (name) customer.name = name;
  if (phone) customer.phone = phone;
  if (email) customer.email = email;

  writeAuditLog(req.user.id, 'UPDATE_PROFILE (customer)');
  return res.json(customer);
}

/** UC07 — Xem lịch sử chuyến đi + số tiền đã thanh toán (BR17/FR-related) */
function getHistory(req, res) {
  const customer = findMyCustomer(req.user.id);
  if (!customer) return res.status(404).json({ error: 'Customer profile not found' });

  const myBookings = db.bookings.filter((b) => b.customerId === customer.id);
  const history = myBookings.map((b) => {
    const trip = db.trips.find((t) => t.id === b.tripId);
    const payment = db.payments.find((p) => p.tripId === b.tripId);
    return { trip, payment: payment || null };
  });
  return res.json(history);
}

module.exports = { getMe, updateMe, getHistory, findMyCustomer };
