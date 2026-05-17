const express = require("express");

const router = express.Router();

const {
  getDashboardStats
} = require("../controllers/adminController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  adminOnly
} = require("../middleware/adminMiddleware");


/**
 * @swagger
 * /api/admin/dashboard-stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: Returns platform statistics for the admin dashboard.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                   example: 120
 *                 totalPlaces:
 *                   type: number
 *                   example: 45
 *                 totalReviews:
 *                   type: number
 *                   example: 320
 *                 totalSavedPlaces:
 *                   type: number
 *                   example: 180
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       403:
 *         description: Access denied, admin only
 *       500:
 *         description: Server error
 */
router.get(

  "/dashboard-stats",
  protect,
  adminOnly,
  getDashboardStats
);



module.exports = router;