const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A gift must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A gift name must have less or equal than 40 characters'],
    minlength: [3, 'A gift name must have more or equal than 3 characters']
  },
  description: {
    type: String,
    required: [true, 'A gift must have a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A gift must have a price']
  },
  category: {
    type: String,
    required: [true, 'A gift must belong to a category'],
    enum: {
      values: ['electronics', 'toys', 'books', 'clothes', 'jewelry', 'home', 'other'],
      message: 'Category is either: electronics, toys, books, clothes, jewelry, home, other'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'A gift must have an image URL']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;
