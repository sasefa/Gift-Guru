const { validationResult, check, param } = require('express-validator');

// Generalized Error Handler for validations
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: errors.array().map(error => error.msg)
    });
  }
  next();
};

exports.validateRecommendationInput = [
  check('userInput')
    .exists().withMessage('User input is required.')
    .isString().withMessage('User input must be a string.')
    .notEmpty().withMessage('User input cannot be empty.'),
  handleValidationErrors // use the general error handler here
];

exports.validateUserId = [
  param('userId')
    .exists().withMessage('User ID is required.')
    .isMongoId().withMessage('User ID must be a valid MongoDB ID.')
    .trim(),
  handleValidationErrors // use the general error handler here
];

exports.validateRecommendationId = [
  param('recommendationId')
    .exists().withMessage('Recommendation ID is required.')
    .isMongoId().withMessage('Recommendation ID must be a valid MongoDB ID.')
    .trim(),
  handleValidationErrors // use the general error handler here
];
