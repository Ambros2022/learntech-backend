const db = require("../models");
const websiteimage = db.websiteimage;
const path = require("path");

const fileTypes  = require("../config/fileTypes");
// Array of allowed files
const array_of_allowed_file_types = fileTypes.Imageformat;

// Allowed file size in mb
const allowed_file_size = 2;
exports.createorupdate = async (req, res) => {
  try {
    let logonames = "";
    let STREAD = { image_key: req.body.image_key };

    if (req.files && req.files.image) {
      let avatar = req.files.image;

      // Check if the uploaded file is allowed
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type ",
          errors: {},
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large ",
          errors: {},
          status: 0,
        });
      }

      let logoname = "website_image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/website_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "website_image/" + logoname;
        STREAD["image"] = logonames;
      }
    }

    const obj = await websiteimage.findOne({
      where: { id: 1 },
    });

    if (obj) {
      websiteimage.update(STREAD, {
        where: { id: 1 },
      });

      return res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
      });
    }

    const websiteimageDetails = await websiteimage.create({
      id: 1,
      image_key: req.body.image_key,
      image: logonames,
    });

    res.status(200).send({
      status: 1,
      message: "Data created Successfully",
      data: websiteimageDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};
