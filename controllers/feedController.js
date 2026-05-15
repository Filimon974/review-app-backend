const Review = require("../models/Review");
const Place = require("../models/Place");
const Tag = require("../models/Tag");



/*
====================================
RECENT REVIEWS
====================================
*/

exports.getRecentReviews = async (req, res) => {

  try {

    const reviews = await Review.find()
      .populate("user", "username")
      .populate("place", "name category location")
      .populate("tags", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





/*
====================================
TRENDING REVIEWS
====================================
*/

exports.getTrendingReviews = async (req, res) => {

  try {

    const reviews = await Review.find()
      .populate("user", "username")
      .populate("place", "name category location")
      .populate("tags", "name")
      .sort({
        likesCount: -1,
        createdAt: -1
      })
      .limit(20);

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};






/*
====================================
POPULAR PLACES
====================================
*/

exports.getPopularPlaces = async (req, res) => {

  try {

    const places = await Place.find()
      .populate("tags", "name")
      .sort({
        averageRating: -1,
        totalReviews: -1
      })
      .limit(20);

    res.json(places);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};