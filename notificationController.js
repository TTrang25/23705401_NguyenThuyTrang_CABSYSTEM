const db = require('../data/store');

/** Xem các thông báo của người dùng hiện tại (đặt xe, tìm tài xế, thanh toán, ...) */
function getMyNotifications(req, res) {
  const items = db.notifications
    .filter((n) => n.userId === req.user.id)
    .sort((a, b) => new Date(b.time) - new Date(a.time));
  return res.json(items);
}

module.exports = { getMyNotifications };
