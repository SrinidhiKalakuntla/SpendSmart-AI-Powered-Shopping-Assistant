const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Prevent duplicate entries
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  previousPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'purchased'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
