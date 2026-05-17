const express = require("express");

const router = express.Router();

const {
  createReview,
  getPlaceReviews,
  updateReview,
  deleteReview,
  getReviewById,
  toggleLikeReview,
  searchReviews
} = require("../controllers/reviewController");

const {
  protect
} = require("../middleware/authMiddleware");



/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - place
 *               - rating
 *               - reviewText
 *             properties:
 *               place:
 *                 type: string
 *                 example: 685f9a12c45a2f1234567890
 *               rating:
 *                 type: number
 *                 example: 5
 *               reviewText:
 *                 type: string
 *                 example: Amazing experience
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Review created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  createReview
);

router.get("/search", searchReviews);;


/**
 * @swagger
 * /reviews/place/{placeId}:
 *   get:
 *     summary: Get reviews for a place
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get(
  "/place/:placeId",
  getPlaceReviews
);




/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get("/:id", getReviewById);




/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               reviewText:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 */
router.put(
  "/:id",
  protect,
  updateReview
);




/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete(
  "/:id",
  protect,
  deleteReview
);




/**
 * @swagger
 * /reviews/like/{id}:
 *   put:
 *     summary: Like or unlike review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review like toggled
 *       404:
 *         description: Review not found
 */
router.put(
  "/like/:id",
  protect,
  toggleLikeReview
);



module.exports = router;