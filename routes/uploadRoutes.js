const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadImage
} = require("../controllers/uploadController");

const {
  protect
} = require("../middleware/authMiddleware");



/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);

module.exports = router;