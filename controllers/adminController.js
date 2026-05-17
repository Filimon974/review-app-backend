const Place = require("../models/Place");
const Review = require("../models/Review");
const User = require("../models/User");



exports.getDashboardStats = async (req, res) => {

  try {

    /*
    =========================
    BASIC COUNTS
    =========================
    */

    const totalPlaces =
      await Place.countDocuments();

    const totalReviews =
      await Review.countDocuments();

    const totalUsers =
      await User.countDocuments();



    /*
    =========================
    TOP RATED PLACE
    =========================
    */

    const topRatedPlace =
      await Place.findOne()
        .sort({ averageRating: -1 });



    /*
    =========================
    MOST ACTIVE USER
    =========================
    */

    const activeUsers =
      await Review.aggregate([

        {
          $group: {
            _id: "$user",
            reviewsCount: {
              $sum: 1
            }
          }
        },

        {
          $sort: {
            reviewsCount: -1
          }
        },

        {
          $limit: 1
        }

      ]);



    let mostActiveUser = null;



    if (activeUsers.length > 0) {

      mostActiveUser =
        await User.findById(
          activeUsers[0]._id
        );

    }



    res.json({

      totalPlaces,
      totalReviews,
      totalUsers,

      topRatedPlace,

      mostActiveUser,

      mostActiveReviews:
        activeUsers[0]?.reviewsCount || 0

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};