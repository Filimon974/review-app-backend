const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  savedPlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place"
  }],

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  avatar: {
  type: String,
  default: ""
},

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);