const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    enum: ["restaurant", "hotel"],
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }],

  contactInfo: {
    phone: String,
    telegram: String,
    instagram: String
  },

  photos: [{
    type: String
  }],

  averageRating: {
    type: Number,
    default: 0
  },

  totalReviews: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);