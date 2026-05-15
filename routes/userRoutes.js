const express = require("express");
const router = express.Router();

const {
  getCurrentUser,
  getSavedPlaces,
  updateAvatar,
  toggleSavePlace
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");



/*
====================================
SAVE / UNSAVE PLACE
====================================
*/

router.put(
  "/save/:placeId",
  protect,
  toggleSavePlace
);




/*
====================================
GET SAVED PLACES
====================================
*/

router.get(
  "/saved",
  protect,
  getSavedPlaces
);

router.get(
  "/me",
  protect,
  getCurrentUser
);

router.put("/avatar", protect, updateAvatar);

module.exports = router;