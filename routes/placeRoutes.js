const express = require("express");

const router = express.Router();

const {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  searchPlaces
} = require("../controllers/placeController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/adminMiddleware");



/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: List of places
 */
router.get("/", getPlaces);




/**
 * @swagger
 * /places/search:
 *   get:
 *     summary: Search places
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Matching places
 */
router.get("/search", searchPlaces);




/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get single place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: Place details
 *       404:
 *         description: Place not found
 */
router.get("/:id", getPlaceById);




/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create new place (Admin)
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kuriftu Resort
 *               category:
 *                 type: string
 *                 example: hotel
 *               description:
 *                 type: string
 *                 example: Luxury resort in Bishoftu
 *               location:
 *                 type: string
 *                 example: Bishoftu
 *               contactInfo:
 *                 type: string
 *                 example: +251900000000
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Place created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  adminOnly,
  createPlace
);




/**
 * @swagger
 * /places/{id}:
 *   put:
 *     summary: Update place (Admin)
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Place updated
 *       404:
 *         description: Place not found
 */
router.put(
  "/:id",
  protect,
  adminOnly,
  updatePlace
);




/**
 * @swagger
 * /places/{id}:
 *   delete:
 *     summary: Delete place (Admin)
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: Place deleted
 *       404:
 *         description: Place not found
 */
router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePlace
);

module.exports = router;