const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

// @route  POST api/recommendations/generate
// @desc   Generate gift recommendations based on user input
// @access Private
router.post('/generate', authMiddleware, recommendationController.generateRecommendations);

// @route  GET api/recommendations/user/:userId
// @desc   Get all recommendations for a specific user
// @access Private
router.get('/user/:userId', authMiddleware, recommendationController.getUserRecommendations);

// @route  GET api/recommendations/:recommendationId
// @desc   Get a specific recommendation
// @access Private
router.get('/:recommendationId', authMiddleware, recommendationController.getRecommendationDetails);

// @route  DELETE api/recommendations/:recommendationId
// @desc   Delete a specific recommendation
// @access Private
router.delete('/:recommendationId', authMiddleware, recommendationController.deleteRecommendation);

module.exports = router;
