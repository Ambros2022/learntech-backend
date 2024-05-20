const db = require("../models");
const path = require("path");
const school = db.school;
const _ = require("lodash");
const schoollevels = db.schoollevels;
const level = db.level;
const schoolamenities = db.schoolamenities;
const school_faqs = db.school_faqs;
const sendsearch = require("../utility/Customsearch");
const schoolgallery = db.schoolgallery;
const Op = db.Sequelize.Op;
// Array of allowed files
const fileTypes = require("../config/fileTypes");
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
// Array of allowed files
const array_of_allowed_file_types = fileTypes.Imageformat;

// Allowed file size in mb
const allowed_file_size = 2;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: school } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, school, totalPages, currentPage };
};
// Function to remove a file

exports.create = async (req, res) => {
  try {
    let icons = "";
    let bannerimages = "";

    if (req.files && req.files.icon) {
      let avatar = req.files.icon;

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

      let IsUpload = avatar.mv("./storage/school_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        icons = "school_logo/" + logoname;
      }
    }

    if (req.files && req.files.banner_image) {
      let avatar = req.files.banner_image;

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

      let IsUpload = avatar.mv("./storage/school_banner_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        bannerimages = "school_banner_image/" + logoname;
      }
    }

    const schoolDetails = await school.create({
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      school_board_id: req.body.school_board_id,
      name: req.body.name,
      slug: req.body.slug,
      status: req.body.status,
      home_view_status: req.body.home_view_status,
      school_type: req.body.school_type,
      listing_order: req.body.listing_order,
      established: req.body.established,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      address: req.body.address,
      map: req.body.map,
      icon: icons,
      banner_image: bannerimages,
      video_url: req.body.video_url,
      avg_rating: req.body.avg_rating,
      info: req.body.info,
      admissions_process: req.body.admissions_process,
      extracurriculars: req.body.extracurriculars,
    });


    if (req.body.amenities && schoolDetails.id) {
      const amndata = JSON.parse(req.body.amenities);
      _.forEach(amndata, async function (value) {

        await schoolamenities.create({
          school_id: schoolDetails.id,
          amenitie_id: value.id,
        });
      });
    }

    if (req.body.levels && schoolDetails.id) {
      const amndata = JSON.parse(req.body.levels);
      _.forEach(amndata, async function (value) {
        await schoollevels.create({
          school_id: schoolDetails.id,
          level_id: value.id,
        });
      });
    }


    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: schoolDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = async (req, res) => {

  try {

    const existingRecord = await school.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    let Schoolupdates = {
      country_id: req.body.country_id || existingRecord.country_id,
      state_id: req.body.state_id || existingRecord.state_id,
      city_id: req.body.city_id || existingRecord.city_id,
      school_board_id: req.body.school_board_id || existingRecord.school_board_id,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      status: req.body.status || existingRecord.status,
      home_view_status: req.body.home_view_status || existingRecord.home_view_status,
      school_type: req.body.school_type || existingRecord.school_type,
      listing_order: req.body.listing_order || existingRecord.listing_order,
      established: req.body.established || existingRecord.established,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keyword: req.body.meta_keyword || existingRecord.meta_keyword,
      address: req.body.address || existingRecord.address,
      map: req.body.map || existingRecord.map,
      video_url: req.body.video_url || existingRecord.video_url,
      avg_rating: req.body.avg_rating || existingRecord.avg_rating,
      info: req.body.info || existingRecord.info,
      admissions_process: req.body.admissions_process || existingRecord.admissions_process,
      extracurriculars: req.body.extracurriculars || existingRecord.extracurriculars,

    };

    // Check if a new logo is provided
    if (req.files && req.files.icon) {
      const avatar = req.files.icon;

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
      const uploadPath = "./storage/school_logo/" + logoname;

      await avatar.mv(uploadPath);

      Schoolupdates.icon = "school_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.icon) {

        const oldLogoPath = "./storage/" + existingRecord.icon;
        await removeFile(oldLogoPath);
      }
    }
    if (req.files && req.files.banner_image) {
      const avatar = req.files.banner_image;

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
      const uploadPath = "./storage/school_banner_image/" + logoname;

      await avatar.mv(uploadPath);

      Schoolupdates.banner_image = "school_banner_image/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.banner_image) {

        const oldLogoPath = "./storage/" + existingRecord.banner_image;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await school.update(Schoolupdates, { where: { id: req.body.id } });

    if (req.body.amenities && req.body.id) {
      await schoolamenities.destroy({
        where: { school_id: req.body.id },
      });
      const amndata = JSON.parse(req.body.amenities);
      _.forEach(amndata, async function (value) {
        await schoolamenities.create({
          school_id: req.body.id,
          amenitie_id: value.id,
        });
      });
    }
    if (req.body.levels && req.body.id) {
      await schoollevels.destroy({
        where: { school_id: req.body.id },
      });
      const amndata = JSON.parse(req.body.levels);
      _.forEach(amndata, async function (value) {
        await schoollevels.create({
          school_id: req.body.id,
          level_id: value.id,
        });
      });
    }


    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 0,
    });
  }
};

exports.findAll = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    columnname,
    orderby,
  } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }


  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];

  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  await school
    .findAndCountAll({
      distinct: true,
      where: data_array,
      limit,
      offset,
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "state",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "citys",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "schoolboard",
          attributes: ["id", "name"],
        },

      ],
      subQuery: false,

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
        data: response.school,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving blog.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  school
    .findByPk(id, {
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "state",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "citys",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "schoolboard",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "schoolamenities",
          attributes: ["id", "amenitie_id"],
          include: [
            {
              association: "schamenities",
              attributes: ["id", "amenities_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoollevels",
          attributes: ["id"],
          include: [
            {
              association: "schlevelname",
              attributes: ["id", "name"],
            },
          ],
        },

        {
          required: false,
          association: "schgallery",
          attributes: ["id", "image"],
        },
        {
          required: false,
          association: "schfaqs",
          attributes: ["id", "questions","answers"],
        },

      ],

    })
    .then((data) => {
      // Extracting only the necessary information from schoolamenities
      // console.log(data.schoolamenities);
      // const amenities = data.schoolamenities.map((item) => ({
      //   id: item.id,
      //   amenities_name: item.schamenities.amenities_name,
      // }));
      if (data) {

        res.status(200).send({
          status: 1,
          message: "Successfully retrieved",
          data: data,
          // data: [{ schoolamenities: amenities }, ...data],
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find school with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving school with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  school
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "school  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete schoolwith id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete school with id=" + id,
      });
    });
};

exports.updatefaqs = async (req, res) => {

  try {
    if (req.body.faqs && req.body.id) {
      await school_faqs.destroy({
        where: { school_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        school_faqs.create({
          school_id: req.body.id,
          questions: value.questions ? value.questions : null,
          answers: value.answers ? value.answers : null,
        });
      });
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 0,
    });
  }
};




exports.updategallery = async (req, res) => {
  try {
    // Check if old images are provided
    if (req.body.oldimages) {
      const oldImages = JSON.parse(req.body.oldimages);

      if (Array.isArray(oldImages) && oldImages.length > 0) {
        let finaloldimage = [];

        await Promise.all(oldImages.map(async (obj) => {
          const parts = obj.dataURL.split('/');
          const desiredPart = parts[parts.length - 2] + '/' + parts.pop();
          finaloldimage.push(desiredPart);
        }));

        let oldRecordsToDelete = await schoolgallery.findAll({
          where: {
            school_id: req.body.id,
            image: {
              [Op.notIn]: finaloldimage
            }
          }
        });



        if (oldRecordsToDelete.length > 0) {
          let deletedRecords = await schoolgallery.destroy({
            where: {
              school_id: req.body.id,
              image: {
                [Op.notIn]: finaloldimage
              }
            },
          });
          oldRecordsToDelete.map(async (value) => {

            const oldLogoPath = "./storage/" + value.image;
            await removeFile(oldLogoPath);


          });
        }


      } else {

        let oldRecordsToDelete = await schoolgallery.findAll({
          where: {
            school_id: req.body.id,

          }
        });



        if (oldRecordsToDelete.length > 0) {
          let deletedRecords = await schoolgallery.destroy({
            where: {
              school_id: req.body.id,
            },
          });
          oldRecordsToDelete.map(async (value) => {
            const oldLogoPath = "./storage/" + value.image;
            await removeFile(oldLogoPath);


          });
        }

      }

      // Check if new images are uploaded
      if (req.files) {
        const images = Object.values(req.files);

        // Process uploaded images
        await Promise.all(images.map(async (imageData) => {
          const imgname = "image" + Date.now() + Math.random() + path.extname(imageData.name);
          const destination = "./storage/school_galleries/" + imgname;

          try {
            // Move the uploaded image to the server
            await imageData.mv(destination);

            // Save the image path to the database
            await schoolgallery.create({
              school_id: req.body.id,
              image: "school_galleries/" + imgname,
            });
          } catch (error) {
            // Handle error during file operations
            console.error("Error processing image:", error);
            throw error; // Re-throw the error to trigger the catch block
          }
        }));
      }

      // Send success response
      return res.status(200).send({
        status: 1,
        message: "Data saved successfully",
      });
    }
  } catch (error) {
    console.error("Error updating gallery:", error);
    return res.status(500).send({
      message: "Unable to process the request",
      status: 0,
    });
  }
};








exports.schoollevelfindAll = async (req, res) => {
  const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var condition = sendsearch.customseacrh(searchText, searchfrom);

  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  level
    .findAndCountAll({
      where: data_array,
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
        data: response.school,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving schooltype",
      });
    });
};