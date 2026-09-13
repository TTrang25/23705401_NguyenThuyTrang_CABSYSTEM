const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('./store');

/**
 * Seeds one Operations Staff account, since public /auth/register only
 * allows self-signup as customer or driver (BR10/BR24 — chỉ nhân viên có
 * quyền mới được cấp bởi hệ thống, không tự đăng ký).
 * Default login: username "admin" / password "admin123"
 */
function seed() {
  if (db.users.find((u) => u.username === 'admin')) return;

  const staffUser = {
    id: uuid(),
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 8),
    role: 'staff',
    status: 'active',
  };
  db.users.push(staffUser);
  console.log('Seeded Operations Staff account -> username: admin / password: admin123');
}

module.exports = seed;
