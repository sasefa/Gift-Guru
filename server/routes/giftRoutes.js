const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const authMiddleware = require('../middleware/authMiddleware');

// Log to check if the imports are successful
console.log("giftController:", giftController);
console.log("authMiddleware:", authMiddleware);

// @route  GET api/gifts/recommendations
// @desc   Get gift recommendations based on user input
// @access Private
router.get('/recommendations', authMiddleware.authenticate, (req, res) => {
    console.log('GET /api/gifts/recommendations route hit');
    giftController.getRecommendations(req, res);
  });  

// @route  GET api/gifts/:giftId
// @desc   Get specific gift details
// @access Public
router.get('/:giftId', (req, res) => {
  console.log(`GET /api/gifts/${req.params.giftId} route hit`);
  giftController.getGiftDetails(req, res);
});

// @route  POST api/gifts/
// @desc   Add a new gift (Admin Only)
// @access Private/Admin
router.post('/', authMiddleware.authenticate, authMiddleware.restrictTo('admin'), (req, res) => {
    console.log('POST /api/gifts route hit');
    giftController.addGift(req, res);
  });  

// @route  PUT api/gifts/:giftId
// @desc   Update gift details (Admin Only)
// @access Private/Admin
router.put('/:giftId', authMiddleware.authenticate, (req, res) => {
  console.log(`PUT /api/gifts/${req.params.giftId} route hit`);
  giftController.updateGift(req, res);
});

// @route  DELETE api/gifts/:giftId
// @desc   Delete a gift (Admin Only)
// @access Private/Admin
router.delete('/:giftId', authMiddleware.authenticate, (req, res) => {
  console.log(`DELETE /api/gifts/${req.params.giftId} route hit`);
  giftController.deleteGift(req, res);
});

module.exports = router;
