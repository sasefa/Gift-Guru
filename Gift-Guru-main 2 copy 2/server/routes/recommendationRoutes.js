const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// @route  POST api/v1/recommendations/generate
// @desc   Generate gift recommendations based on user input
// @access Private/Admin
router.post(
  '/v1/generate', 
 // authMiddleware.authenticate, 
//  authMiddleware.restrictTo('admin'), 
 // validationMiddleware.validateRecommendationInput,
  recommendationController.generateRecommendations
);

// @route  GET api/v1/recommendations/user/:userId
// @desc   Get all recommendations for a specific user
// @access Private
router.get(
  '/v1/user/:userId', 
  authMiddleware.authenticate, 
  validationMiddleware.validateUserId, 
  recommendationController.getUserRecommendations
);

// @route  GET api/v1/recommendations/:recommendationId
// @desc   Get a specific recommendation
// @access Private
router.get(
  '/v1/:recommendationId', 
  authMiddleware.authenticate, 
  validationMiddleware.validateRecommendationId, 
  recommendationController.getRecommendationDetails
);

// @route  DELETE api/v1/recommendations/:recommendationId
// @desc   Delete a specific recommendation
// @access Private/Admin
router.delete(
  '/v1/:recommendationId', 
  authMiddleware.authenticate, 
  authMiddleware.restrictTo('admin'), 
  validationMiddleware.validateRecommendationId,
  recommendationController.deleteRecommendation
);

module.exports = router;