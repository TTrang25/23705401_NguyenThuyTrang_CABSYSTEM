const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/store');
const { JWT_SECRET } = require('../middleware/auth');
const { writeAuditLog } = require('../utils/helpers');

/** UC01 / UC13 — Đăng ký tài khoản (customer hoặc driver) */
function register(req, res) {
  const { username, password, role, name, phone, email } = req.body;

  if (!username || !password || !role || !name || !phone) {
    return res.status(400).json({ error: 'username, password, role, name, phone are required' });
  }
  if (!['customer', 'driver'].includes(role)) {
    return res.status(400).json({ error: 'role must be "customer" or "driver"' });
  }
  if (db.users.find((u) => u.username === username)) {
    return res.status(409).json({ error: 'username already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 8);
  const user = { id: uuid(), username, passwordHash, role, status: 'active' };
  db.users.push(user);

  let profile;
  if (role === 'customer') {
    profile = { id: uuid(), userId: user.id, name, phone, email: email || null };
    db.customers.push(profile);
  } else {
    profile = { id: uuid(), userId: user.id, name, phone, status: 'offline' }; // E02 Driver
    db.drivers.push(profile);
  }

  writeAuditLog(user.id, `REGISTER (${role})`);
  return res.status(201).json({ userId: user.id, role, profile });
}

/** UC02 — Đăng nhập */
function login(req, res) {
  const { username, password } = req.body;
  const user = db.users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  if (user.status !== 'active') {
    return res.status(403).json({ error: 'Account is not active' });
  }

  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, {
    expiresIn: '12h',
  });
  writeAuditLog(user.id, 'LOGIN');
  return res.json({ token, role: user.role, userId: user.id });
}

module.exports = { register, login };
