const Gift = require('../models/Gift');

const getAllGifts = async (req, res, next) => {
  try {
    const gifts = await Gift.find();
    
    res.status(200).json({
      status: 'success',
      results: gifts.length,
      data: {
        gifts
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching gifts, please try again later.'
    });
  }
};

const getGift = async (req, res, next) => {
  try {
    const gift = await Gift.findById(req.params.id);

    if (!gift) {
      return res.status(404).json({
        status: 'fail',
        message: 'No gift found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        gift
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching the gift, please try again later.'
    });
  }
};

const createGift = async (req, res, next) => {
  try {
    const newGift = await Gift.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        gift: newGift
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating the gift, please ensure all fields are valid and try again.'
    });
  }
};

const updateGift = async (req, res, next) => {
  try {
    const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!gift) {
      return res.status(404).json({
        status: 'fail',
        message: 'No gift found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        gift
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating the gift, please ensure all fields are valid and try again.'
    });
  }
};

const deleteGift = async (req, res, next) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);

    if (!gift) {
      return res.status(404).json({
        status: 'fail',
        message: 'No gift found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting the gift, please try again later.'
    });
  }
};

module.exports = {
  getAllGifts,
  getGift,
  createGift,
  updateGift,
  deleteGift
};
