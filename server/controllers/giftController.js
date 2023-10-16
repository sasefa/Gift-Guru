const Gift = require('../models/Gift');
//const { ApiError } = require('../utils/ApiError'); // Ensure the path is correct

// Handling functions
const handleFindAll = async () => {
  return await Gift.find().select('name price description'); // Adjust fields as needed
};

const handleFindById = async (id) => {
  return await Gift.findById(id).select('name price description'); // Adjust fields
};

const handleCreate = async (data) => {
  return await Gift.create(data);
};

const handleUpdate = async (id, data) => {
  return await Gift.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const handleDelete = async (id) => {
  return await Gift.findByIdAndDelete(id);
};

// Controller functions
const getAllGifts = async (req, res, next) => {
  try {
    const gifts = await handleFindAll();
    res.status(200).json({
      status: 'success',
      results: gifts.length,
      data: { gifts }
    });
  } catch (err) {
    next(new ApiError('Error fetching gifts, please try again later.', 500));
  }
};

const getGift = async (req, res, next) => {
  try {
    const gift = await handleFindById(req.params.id);

    if (!gift) {
      return next(new ApiError('No gift found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { gift }
    });
  } catch (err) {
    next(new ApiError('Error fetching the gift, please try again later.', 500));
  }
};

const createGift = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      return next(new ApiError('Name and Price are required to create a gift.', 400));
    }

    const newGift = await handleCreate(req.body);

    res.status(201).json({
      status: 'success',
      data: { gift: newGift }
    });
  } catch (err) {
    next(new ApiError('Error creating the gift, please ensure all fields are valid and try again.', 400));
  }
};

const updateGift = async (req, res, next) => {
  try {
    const gift = await handleUpdate(req.params.id, req.body);

    if (!gift) {
      return next(new ApiError('No gift found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { gift }
    });
  } catch (err) {
    next(new ApiError('Error updating the gift, please ensure all fields are valid and try again.', 400));
  }
};

const deleteGift = async (req, res, next) => {
  try {
    const gift = await handleDelete(req.params.id);

    if (!gift) {
      return next(new ApiError('No gift found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(new ApiError('Error deleting the gift, please try again later.', 500));
  }
};

module.exports = {
  getAllGifts,
  getGift,
  createGift,
  updateGift,
  deleteGift
};
