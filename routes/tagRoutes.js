const express = require("express");

const router = express.Router();

const {
  getTags,
  createTag,
  deleteTag
} = require("../controllers/tagController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  adminOnly
} = require("../middleware/adminMiddleware");



/*
=========================
GET TAGS
=========================
*/
/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     description: Returns all available tags.
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Tags fetched successfully
 *       500:
 *         description: Server error
 */

router.get(
  "/",
  getTags
);




/*
=========================
CREATE TAG
=========================
*/

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     description: Admin can create a new tag.
 *     tags: [Tags]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: student-friendly
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Server error
 */


router.post(
  "/",
  protect,
  adminOnly,
  createTag
);




/*
=========================
DELETE TAG
=========================
*/

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete tag
 *     description: Admin can delete a tag.
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTag
);

module.exports = router;