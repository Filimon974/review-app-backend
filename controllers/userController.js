const User = require("../models/User");
const Place = require("../models/Place");
const Review = require("../models/Review");


/*
====================================
TOGGLE SAVE PLACE
====================================
*/

exports.toggleSavePlace = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    const placeId = req.params.placeId;


    // Check if place exists
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }


    // Already saved?
    const alreadySaved =
      user.savedPlaces.includes(placeId);


    if (alreadySaved) {

      // REMOVE
      user.savedPlaces =
        user.savedPlaces.filter(
          id => id.toString() !== placeId
        );

    } else {

      // ADD
      user.savedPlaces.push(placeId);

    }

    await user.save();

    res.json({
      savedPlaces: user.savedPlaces
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





/*
==================================
GET SAVED PLACES
==================================
*/

exports.getSavedPlaces = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(req.user.id)
        .populate("savedPlaces");

    res.json(user.savedPlaces);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
==================================
GET CURRENT USER
==================================
*/

exports.getCurrentUser = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(req.user.id)

        .select("-password")

        .populate("savedPlaces");



    const reviews =
      await Review.find({
        user: req.user.id
      })

      .populate(
        "place",
        "name location"
      )

      .sort({
        createdAt: -1
      });



    /*
    ==========================
    TOTAL LIKES RECEIVED
    ==========================
    */

    let totalLikes = 0;

    reviews.forEach(review => {

      totalLikes +=
        review.likes.length;

    });



    res.json({

      user,

      stats: {

        reviewsCount:
          reviews.length,

        savedCount:
          user.savedPlaces.length,

        likesReceived:
          totalLikes

      },

      reviews

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
==================================
UPDATE AVATAR
==================================
*/
exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.avatar = req.body.avatar;
    await user.save();

    res.json({
      message: "Avatar updated successfully",
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};