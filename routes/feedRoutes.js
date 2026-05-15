const express = require("express");

const router = express.Router();

const {
  getRecentReviews,
  getTrendingReviews,
  getPopularPlaces
} = require("../controllers/feedController");




// RECENT REVIEWS
router.get(
  "/recent-reviews",
  getRecentReviews
);



// TRENDING REVIEWS
router.get(
  "/trending-reviews",
  getTrendingReviews
);



// POPULAR PLACES
router.get(
  "/popular-places",
  getPopularPlaces
);

module.exports = router;