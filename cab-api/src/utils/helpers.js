const { v4: uuid } = require('uuid');
const db = require('../data/store');

/** BR11 / BR26 / NFR07 — ghi vết mọi thao tác quan trọng */
function writeAuditLog(userId, action) {
  db.auditLogs.push({ id: uuid(), userId, action, time: new Date().toISOString() });
}

/** BR16 / FR06 / FR13 — thông báo cho khách hàng / tài xế */
function createNotification(userId, type, content) {
  const n = { id: uuid(), userId, type, content, status: 'sent', time: new Date().toISOString() };
  db.notifications.push(n);
  return n;
}

/** Haversine distance in km — dùng để tìm & ưu tiên tài xế gần khách hàng (BR02/FR03/FR04) */
function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** BR06 / FR09 — tính cước dựa trên loại dịch vụ + quãng đường ước tính */
const FARE_TABLE = {
  bike: { base: 10000, perKm: 4000 },
  car4: { base: 20000, perKm: 8000 },
  car7: { base: 25000, perKm: 10000 },
};

function calculateFare(vehicleType, distanceKmValue) {
  const rate = FARE_TABLE[vehicleType] || FARE_TABLE.car4;
  const distance = distanceKmValue || 3; // fallback estimate when no real GPS distance yet
  return Math.round(rate.base + rate.perKm * distance);
}

module.exports = { writeAuditLog, createNotification, distanceKm, calculateFare, FARE_TABLE };
