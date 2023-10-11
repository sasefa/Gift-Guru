const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const { check, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route  POST api/auth/register
// @desc   Register a new user
// @access Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  handleValidationErrors,
  authController.signup
);

// @route  POST api/auth/login
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  handleValidationErrors,
  authController.login
);

module.exports = router;