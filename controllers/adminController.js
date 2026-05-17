const Place = require("../models/Place");
const Review = require("../models/Review");
const User = require("../models/User");



exports.getDashboardStats = async (req, res) => {

  try {

    const totalPlaces =
      await Place.countDocuments();

    const totalReviews =
      await Review.countDocuments();

    const totalUsers =
      await User.countDocuments();



    res.json({

      totalPlaces,
      totalReviews,
      totalUsers

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};