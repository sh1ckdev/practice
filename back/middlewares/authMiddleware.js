

const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-modal');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports = authMiddleware;
