const db = require("../models");
const path = require("path");

const Amenities = db.amenities;
const sendsearch = require("../utility/Customsearch");
const fileTypes = require("../config/fileTypes");

const array_of_allowed_file_types = fileTypes.Imageformat;
const allowed_file_size = 2;
// Function to remove a file
const fs = require("fs").promises;
async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}


const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Amenities } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Amenities, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.amenities_logo) {
      let avatar = req.files.amenities_logo;

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

      let logoname = "logo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/amenities_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "amenities_logo/" + logoname;
      }
    }
    if (logonames == "") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const AmenitiesDetails = await Amenities.create({
        amenities_name: req.body.amenities_name,
        amenities_slug: req.body.amenities_slug,
        amenities_logo: logonames,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: AmenitiesDetails,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, columnname, searchfrom, orderby } = req.query;

  var column = columnname ? columnname : "amenities_name";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  const { limit, offset } = getPagination(page, size);
  Amenities.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [orderconfig],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.Amenities,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving amenities.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Amenities.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "amenities  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete Sub amenities with id=${id}. Maybe amenities was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete amenities with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Amenities.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find amenities with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving amenities with id=" + id,
      });
    });
};




exports.update = async (req, res) => {
  try {
    // Check if the record exists in the database
    const existingRecord = await Amenities.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    let amenitiesUpdates = {
      amenities_name: req.body.amenities_name || existingRecord.amenities_name,
      amenities_slug: req.body.amenities_slug || existingRecord.amenities_slug,
    };

    // Check if a new logo is provided
    if (req.files && req.files.amenities_logo) {
      const avatar = req.files.amenities_logo;

      // Check file type and size
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid file type",
          errors: {},
          status: 0,
        });
      }
      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large",
          errors: {},
          status: 0,
        });
      }

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const uploadPath = "./storage/amenities_logo/" + logoname;

      await avatar.mv(uploadPath);

      amenitiesUpdates.amenities_logo = "amenities_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.amenities_logo) {
        console.log("existingRecord.icon",existingRecord.amenities_logo);
        const oldLogoPath = "./storage/" + existingRecord.amenities_logo;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await Amenities.update(amenitiesUpdates, { where: { id: req.body.id } });

    res.status(200).send({
      status: 1,
      message: "Data saved successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error.message,
      status: 0,
    });
  }
};

