// JWT Authentication Middleware
// Protects admin-only routes by verifying the Bearer token
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Expect: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach admin info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};

module.exports = authMiddleware;
