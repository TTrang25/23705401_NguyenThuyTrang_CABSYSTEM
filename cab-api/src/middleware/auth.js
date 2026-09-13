const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cab-system-dev-secret';

/** NFR06 / BR10 — xác thực người dùng bằng JWT */
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, role, username }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/** BR10 / BR24 / NFR06 — phân quyền theo vai trò (customer / driver / staff) */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticate, authorize, JWT_SECRET };
