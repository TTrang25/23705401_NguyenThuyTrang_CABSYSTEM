/**
 * In-memory data store.
 * Mirrors entities E01-E13 from srs.md (10.2. Xác định Entity).
 * Swap this module for a real database layer (e.g. Prisma/Sequelize) later —
 * every controller only talks to the functions exported here.
 */

const db = {
  users: [],            // E12 UserAccount: {id, username, passwordHash, role, status}
  customers: [],         // E01 Customer:    {id, userId, name, phone, email}
  drivers: [],           // E02 Driver:      {id, userId, name, phone, status}
  vehicles: [],          // E03 Vehicle:     {id, driverId, plateNumber, type}
  trips: [],             // E04 Trip:        {id, pickup, destination, status, vehicleType, createdAt, ...}
  bookings: [],          // E05 Booking:     {id, customerId, tripId, vehicleType}
  assignments: [],       // E06 DriverAssignment: {id, tripId, driverId, status, offeredAt}
  payments: [],          // E07 Payment:     {id, tripId, amount, method, status}
  fares: [],             // E08 Fare:        {id, tripId, serviceType, amount}
  ratings: [],           // E09 Rating:      {id, tripId, customerId, driverId, score, comment}
  notifications: [],     // E10 Notification:{id, userId, type, content, status}
  locations: [],         // E11 Location:    {id, driverId, latitude, longitude, time}
  auditLogs: [],         // E13 AuditLog:    {id, userId, action, time}
};

module.exports = db;
