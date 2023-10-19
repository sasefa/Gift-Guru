const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');  // Ensure the path is correct

const signToken = (id) => {
  if(!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new ApiError(500, 'JWT configurations are not set in .env file.');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation error', errors.array());
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (rawPassword, hashedPassword) => {
  return await bcrypt.compare(rawPassword, hashedPassword);
};

const signup = async (req, res, next) => {
  try {
    validateRequest(req);

    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    validateRequest(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await comparePassword(password, user.password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login
};
