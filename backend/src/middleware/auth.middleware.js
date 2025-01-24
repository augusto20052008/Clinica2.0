const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado',
    });
  }

  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Formato de token inválido',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};

module.exports = authMiddleware;
