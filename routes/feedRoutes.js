const express = require("express");

const router = express.Router();

const {
  getRecentReviews,
  getTrendingReviews,
  getPopularPlaces
} = require("../controllers/feedController");



/**
 * @swagger
 * /feed/recent-reviews:
 *   get:
 *     summary: Get recent reviews
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: List of recent reviews
 */
router.get(
  "/recent-reviews",
  getRecentReviews
);




/**
 * @swagger
 * /feed/trending-reviews:
 *   get:
 *     summary: Get trending reviews
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: List of trending reviews
 */
router.get(
  "/trending-reviews",
  getTrendingReviews
);




/**
 * @swagger
 * /feed/popular-places:
 *   get:
 *     summary: Get popular places
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: List of popular places
 */
router.get(
  "/popular-places",
  getPopularPlaces
);

module.exports = router;