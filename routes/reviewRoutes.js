const express = require("express");

const router = express.Router();

const {
  createReview,
  getPlaceReviews,
  updateReview,
  deleteReview,
  getReviewById,
  toggleLikeReview
} = require("../controllers/reviewController");

const {
  protect
} = require("../middleware/authMiddleware");




// CREATE REVIEW
router.post(
  "/",
  protect,
  createReview
);



// GET PLACE REVIEWS
router.get(
  "/place/:placeId",
  getPlaceReviews
);

// Get Review by ID
router.get("/:id", getReviewById);



// UPDATE REVIEW
router.put(
  "/:id",
  protect,
  updateReview
);



// DELETE REVIEW
router.delete(
  "/:id",
  protect,
  deleteReview
);



// LIKE / UNLIKE
router.put(
  "/like/:id",
  protect,
  toggleLikeReview
);



module.exports = router;