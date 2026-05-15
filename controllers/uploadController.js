/*
====================================
UPLOAD IMAGE
====================================
*/

exports.uploadImage = async (req, res) => {

  try {

    res.json({
      imageUrl: req.file.path
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};