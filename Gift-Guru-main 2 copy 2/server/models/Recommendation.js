const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Recommendation must belong to a User!']
  },
  gifts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Gift',
      required: [true, 'Recommendation must refer to a Gift!']
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
