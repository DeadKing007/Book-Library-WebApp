const jwt = require('jsonwebtoken');
const secretKey = 'secret_key'; 

// Middleware for user authorization
exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded.username;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
};
