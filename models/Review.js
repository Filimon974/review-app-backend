const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  reviewText: {
    type: String,
    required: true
  },

  photos: [{
    type: String
  }],

  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }],

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  likesCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);