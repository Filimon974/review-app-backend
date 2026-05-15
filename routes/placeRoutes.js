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



// PUBLIC
router.get("/", getPlaces);
router.get("/search", searchPlaces);
router.get("/:id", getPlaceById);



// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  createPlace
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updatePlace
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePlace
);

module.exports = router;