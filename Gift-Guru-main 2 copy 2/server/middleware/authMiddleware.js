const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  let token;

  // Check if token exists in request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.error('Token not provided');
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.'
    });
  }

  // Verify the token
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined in .env');
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token! Please log in again.'
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.error(`User role [${req.user.role}] not authorized for this operation`);
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action.'
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  restrictTo
};
