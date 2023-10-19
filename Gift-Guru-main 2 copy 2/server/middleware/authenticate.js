const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw new AuthError('Token not provided');
    }

    const decodedUserData = verifyToken(token);
    req.user = await fetchUser(decodedUserData);

    if (!req.user) {
      throw new AuthError('User not found');
    }

    next();
  } catch (error) {
    handleAuthError(error, res, next);
  }
};

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AuthError('JWT_SECRET not defined in .env');
    
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AuthError('Invalid token');
  }
};

const fetchUser = async (decoded) => {
  try {
    return await User.findById(decoded.id);
  } catch (error) {
    throw new AuthError('Error fetching user');
  }
};

const handleAuthError = (error, res, next) => {
  if (error instanceof AuthError) {
    // Optionally: Log the error (for example, to a file or monitoring system)
    console.error('[AuthError]', error.message);
    return res.status(401).json({
      status: 'fail',
      message: error.message
    });
  }
  
  // Pass other types of errors to the next error handler
  next(error);
};

module.exports = authenticate;
