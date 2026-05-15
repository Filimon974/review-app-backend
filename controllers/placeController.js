const Place = require("../models/Place");



// CREATE PLACE
exports.createPlace = async (req, res) => {

  try {

    const place = await Place.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(place);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// GET ALL PLACES
exports.getPlaces = async (req, res) => {

  try {

    const places = await Place.find()
      .populate("tags")
      .sort({ createdAt: -1 });

    res.json(places);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// GET SINGLE PLACE
exports.getPlaceById = async (req, res) => {

  try {

    const place = await Place.findById(req.params.id)
      .populate("tags");

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    res.json(place);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// UPDATE PLACE
exports.updatePlace = async (req, res) => {

  try {

    const place = await Place.findById(
      req.params.id
    );

    if (!place) {

      return res.status(404).json({
        message: "Place not found"
      });

    }

    place.name =
      req.body.name || place.name;

    place.category =
      req.body.category ||
      place.category;

    place.description =
      req.body.description ||
      place.description;

    place.location =
      req.body.location ||
      place.location;

    place.photos =
      req.body.photos ||
      place.photos;

    place.tags =
      req.body.tags ||
      place.tags;

    const updatedPlace =
      await place.save();

    res.json(updatedPlace);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// DELETE PLACE
exports.deletePlace = async (req, res) => {

  try {

    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    await place.deleteOne();

    res.json({
      message: "Place deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
====================================
SEARCH & FILTER PLACES
====================================
*/

exports.searchPlaces = async (req, res) => {

  try {

    const {
      search,
      category,
      location,
      tag
    } = req.query;

    let query = {};


    /*
    ==============================
    SEARCH BY NAME
    ==============================
    */

    if (search) {
      query.name = {
        $regex: search,
        $options: "i"
      };
    }


    /*
    ==============================
    CATEGORY FILTER
    ==============================
    */

    if (category) {
      query.category = category;
    }


    /*
    ==============================
    LOCATION FILTER
    ==============================
    */

    if (location) {
      query.location = {
        $regex: location,
        $options: "i"
      };
    }


    /*
    ==============================
    TAG FILTER
    ==============================
    */

    if (tag) {
      query.tags = tag;
    }


    const places = await Place.find(query)
      .populate("tags", "name")
      .sort({
        averageRating: -1,
        totalReviews: -1
      });

    res.json(places);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};