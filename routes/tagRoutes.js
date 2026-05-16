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

router.get(
  "/",
  getTags
);




/*
=========================
CREATE TAG
=========================
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

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTag
);

module.exports = router;