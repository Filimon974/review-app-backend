const express = require("express");

const router = express.Router();

const {
  getCurrentUser,
  getSavedPlaces,
  updateAvatar,
  toggleSavePlace
} = require("../controllers/userController");

const {
  protect
} = require("../middleware/authMiddleware");



/**
 * @swagger
 * /users/save/{placeId}:
 *   put:
 *     summary: Save or unsave place
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: Place save toggled
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/save/:placeId",
  protect,
  toggleSavePlace
);




/**
 * @swagger
 * /users/saved:
 *   get:
 *     summary: Get saved places
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved places
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/saved",
  protect,
  getSavedPlaces
);




/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  protect,
  getCurrentUser
);




/**
 * @swagger
 * /users/avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 example: https://res.cloudinary.com/demo/image/upload/avatar.jpg
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/avatar",
  protect,
  updateAvatar
);

module.exports = router;