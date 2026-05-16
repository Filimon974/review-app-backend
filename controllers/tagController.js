const Tag = require("../models/Tag");



/*
=========================
GET TAGS
=========================
*/

exports.getTags = async (
  req,
  res
) => {

  try {

    const tags =
      await Tag.find()
        .sort({ name: 1 });

    res.json(tags);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




/*
=========================
CREATE TAG
=========================
*/

exports.createTag = async (
  req,
  res
) => {

  try {

    const { name } = req.body;

    const existingTag =
      await Tag.findOne({ name });

    if (existingTag) {

      return res.status(400).json({
        message: "Tag exists"
      });

    }

    const tag =
      await Tag.create({ name });

    res.status(201).json(tag);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




/*
=========================
DELETE TAG
=========================
*/

exports.deleteTag = async (
  req,
  res
) => {

  try {

    await Tag.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Tag deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};