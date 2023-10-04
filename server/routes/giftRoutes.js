const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const authMiddleware = require('../middleware/authMiddleware');

// @route  GET api/gifts/recommendations
// @desc   Get gift recommendations based on user input
// @access Private
router.get('/recommendations', authMiddleware, giftController.getRecommendations);

// @route  GET api/gifts/:giftId
// @desc   Get specific gift details
// @access Public
router.get('/:giftId', giftController.getGiftDetails);

// @route  POST api/gifts/
// @desc   Add a new gift (Admin Only)
// @access Private/Admin
router.post('/', authMiddleware, giftController.addGift);

// @route  PUT api/gifts/:giftId
// @desc   Update gift details (Admin Only)
// @access Private/Admin
router.put('/:giftId', authMiddleware, giftController.updateGift);

// @route  DELETE api/gifts/:giftId
// @desc   Delete a gift (Admin Only)
// @access Private/Admin
router.delete('/:giftId', authMiddleware, giftController.deleteGift);

module.exports = router;
