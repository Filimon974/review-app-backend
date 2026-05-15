const Review = require("../models/Review");
const Place = require("../models/Place");
const Tag = require("../models/Tag");


/*
====================================
CREATE REVIEW
====================================
*/

exports.createReview = async (req, res) => {

  try {

    const {
      place,
      rating,
      reviewText,
      photos,
      tags
    } = req.body;


    // Prevent duplicate review
    const existingReview = await Review.findOne({
      user: req.user._id,
      place
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You already reviewed this place"
      });
    }


    const review = await Review.create({
      user: req.user._id,
      place,
      rating,
      reviewText,
      photos,
      tags
    });


    /*
    ============================
    UPDATE PLACE RATING
    ============================
    */

    const reviews = await Review.find({ place });

    const totalRating = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      totalRating / reviews.length;

    await Place.findByIdAndUpdate(place, {
      averageRating,
      totalReviews: reviews.length
    });

    res.status(201).json(review);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





/*
====================================
GET REVIEWS FOR PLACE
====================================
*/

exports.getPlaceReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      place: req.params.placeId
    })
      .populate("user", "username")
      .populate("tags")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





/*
====================================
UPDATE REVIEW
====================================
*/

exports.updateReview = async (req, res) => {

  try {

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }


    // Only owner can update
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }


    const updatedReview =
      await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedReview);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





/*
====================================
DELETE REVIEW
====================================
*/

exports.deleteReview = async (req, res) => {

  try {

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }


    // Only owner can delete
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await review.deleteOne();

    res.json({
      message: "Review deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};






/*
====================================
LIKE / UNLIKE REVIEW
====================================
*/

exports.toggleLikeReview = async (req, res) => {

  try {

    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }


    const alreadyLiked =
      review.likes.includes(req.user._id);


    if (alreadyLiked) {

      review.likes =
        review.likes.filter(
          userId =>
            userId.toString() !==
            req.user._id.toString()
        );

      review.likesCount -= 1;

    } else {

      review.likes.push(req.user._id);

      review.likesCount += 1;

    }

    await review.save();

    res.json({
      likesCount: review.likesCount
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
====================================
GET SINGLE REVIEW
====================================
*/

exports.getReviewById = async (
  req,
  res
) => {

  try {

    const review =
      await Review.findById(
        req.params.id
      )

      .populate(
        "user",
        "name avatar"
      )

      .populate(
        "place",
        "name location"
      )

      .populate(
        "tags",
        "name"
      );



    if (!review) {

      return res.status(404).json({
        message: "Review not found"
      });

    }



    res.json(review);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};