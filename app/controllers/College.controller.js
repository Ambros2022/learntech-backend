const db = require("../models");
const path = require("path");
const College = db.college;
const Collegestream = db.college_stream;
const Collegeameneties = db.college_amenities;
const Collegerecoginations = db.college_recognition;
const Collegegallery = db.college_gallery;
const college_faq = db.college_faqs;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");
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
  const { count: totalItems, rows: College } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, College, totalPages, currentPage };
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
  await College
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
        // {
        //   required: false,
        //   association: "collegefaqs",
        //   attributes: ["id", "questions", "answers"],
        // },

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
        data: response.College,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving college.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  College.findByPk(id, {
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
        association: "collegestreams",
        attributes: ["id", "stream_id"],
        include: [
          {
            association: "clgstreams",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        required: false,
        association: "collegeamenities",
        attributes: ["id", "amenitie_id"],
        include: [
          {
            association: "clgamenities",
            attributes: ["id", "amenities_name"],
          },
        ],
      },
      {
        required: false,
        association: "collegerecognitions",
        attributes: ["id", "recognition_id"],
        include: [
          {
            association: "clgrecognitions",
            attributes: ["id", "recognition_approval_name"],
          },
        ],
      },
      {
        required: false,
        association: "collegefaqs",
        attributes: ["id", "questions", "answers"],
      },
      {
        required: false,
        association: "clggallery",
        attributes: ["id", "image"],
      },

    ],
    // ],
  })
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
          message: `Cannot find colleges with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving colleges with id=" + id,
      });
    });
};

exports.create = async (req, res) => {
  try {
    let icons = "";
    let logos = "";
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

      let IsUpload = avatar.mv("./storage/college_icon/" + logoname) ? 1 : 0;

      if (IsUpload) {
        icons = "college_icon/" + logoname;
      }
    }

    if (req.files && req.files.logo) {
      let avatar = req.files.logo;

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

      let IsUpload = avatar.mv("./storage/college_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logos = "college_logo/" + logoname;
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

      let IsUpload = avatar.mv("./storage/college_banner_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        bannerimages = "college_banner_image/" + logoname;
      }
    }

    const CollegeDetails = await College.create({
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      name: req.body.name,
      slug: req.body.slug,
      type: req.body.type,
      status: req.body.status,
      home_view_status: req.body.home_view_status,
      college_type: req.body.college_type,
      listing_order: req.body.listing_order,
      established: req.body.established,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      address: req.body.address,
      map: req.body.map,
      icon: icons,
      logo: logos,
      banner_image: bannerimages,
      video_url: req.body.video_url,
      // avg_rating: req.body.avg_rating,
      info: req.body.info,
      admissions: req.body.admissions,
      placements: req.body.placements,
      rankings: req.body.rankings,
      scholarship: req.body.scholarship,
      hostel: req.body.hostel,
    });


    if (req.body.streams && CollegeDetails.id) {
      const stream = JSON.parse(req.body.streams);
      _.forEach(stream, async function (value) {

        await Collegestream.create({
          stream_id: value.id,
          college_id: CollegeDetails.id,
        });
      });
    }

    if (req.body.amenities && CollegeDetails.id) {
      const stream = JSON.parse(req.body.amenities);
      _.forEach(stream, async function (value) {

        await Collegeameneties.create({
          amenitie_id: value.id,
          college_id: CollegeDetails.id,
        });
      });
    }

    if (req.body.recoginations && CollegeDetails.id) {
      const stream = JSON.parse(req.body.recoginations);
      _.forEach(stream, async function (value) {

        await Collegerecoginations.create({
          recognition_id: value.id,
          college_id: CollegeDetails.id,
        });
      });
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: CollegeDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  College.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "College  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete College with id=${id}. Maybe College was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete college with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  try {

    const existingRecord = await College.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    const collegeupdate = {
      country_id: req.body.country_id || existingRecord.country_id,
      state_id: req.body.state_id || existingRecord.state_id,
      city_id: req.body.city_id || existingRecord.city_id,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      type: req.body.type || existingRecord.type,
      status: req.body.status || existingRecord.status,
      home_view_status: req.body.home_view_status || existingRecord.home_view_status,
      college_type: req.body.college_type || existingRecord.college_type,
      listing_order: req.body.listing_order || existingRecord.listing_order,
      established: req.body.established || existingRecord.established,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keyword: req.body.meta_keyword || existingRecord.meta_keyword,
      address: req.body.address || existingRecord.address,
      map: req.body.map || existingRecord.map,
      video_url: req.body.video_url || existingRecord.video_url,
      // avg_rating: req.body.avg_rating || existingRecord.avg_rating,
      info: req.body.info || existingRecord.info,
      admissions: req.body.admissions || existingRecord.admissions,
      placements: req.body.placements || existingRecord.placements,
      rankings: req.body.rankings || existingRecord.rankings,
      scholarship: req.body.scholarship || existingRecord.scholarship,
      hostel: req.body.hostel || existingRecord.hostel,
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
      const uploadPath = "./storage/college_icon/" + logoname;

      await avatar.mv(uploadPath);

      collegeupdate.icon = "college_icon/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.icon) {

        const oldLogoPath = "./storage/" + existingRecord.icon;
        await removeFile(oldLogoPath);
      }
    }

    if (req.files && req.files.logo) {
      const avatar = req.files.logo;

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
      const uploadPath = "./storage/college_logo/" + logoname;

      await avatar.mv(uploadPath);

      collegeupdate.logo = "college_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.logo) {

        const oldLogoPath = "./storage/" + existingRecord.logo;
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
      const uploadPath = "./storage/college_banner_image/" + logoname;

      await avatar.mv(uploadPath);

      collegeupdate.banner_image = "college_banner_image/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.banner_image) {

        const oldLogoPath = "./storage/" + existingRecord.banner_image;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await College.update(collegeupdate, { where: { id: req.body.id } });


    if (req.body.streams && req.body.id) {
      await Collegestream.destroy({
        where: { college_id: req.body.id },
      });
      const stream = JSON.parse(req.body.streams);
      _.forEach(stream, async function (value) {
        await Collegestream.create({
          college_id: req.body.id,
          stream_id: value.id,
        });
      });
    }
    if (req.body.amenities && req.body.id) {
      await Collegeameneties.destroy({
        where: { college_id: req.body.id },
      });
      const stream = JSON.parse(req.body.amenities);
      _.forEach(stream, async function (value) {
        await Collegeameneties.create({
          college_id: req.body.id,
          amenitie_id: value.id,
        });
      });
    }
    if (req.body.recoginations && req.body.id) {
      await Collegerecoginations.destroy({
        where: { college_id: req.body.id },
      });
      const stream = JSON.parse(req.body.recoginations);
      _.forEach(stream, async function (value) {
        await Collegerecoginations.create({
          college_id: req.body.id,
          recognition_id: value.id,
        });
      });
    }


    res.status(200).send({
      status: 1,
      message: "Data update Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 0,
    });
  }
};



exports.updatefaqs = async (req, res) => {
  try {
    if (req.body.faqs && req.body.id) {
      await college_faq.destroy({
        where: { college_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        college_faq.create({
          college_id: req.body.id,
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

        let oldRecordsToDelete = await Collegegallery.findAll({
          where: {
            college_id: req.body.id,
            image: {
              [Op.notIn]: finaloldimage
            }
          }
        });



        if (oldRecordsToDelete.length > 0) {
          let deletedRecords = await Collegegallery.destroy({
            where: {
              college_id: req.body.id,
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

        let oldRecordsToDelete = await Collegegallery.findAll({
          where: {
            college_id: req.body.id,

          }
        });



        if (oldRecordsToDelete.length > 0) {
          let deletedRecords = await Collegegallery.destroy({
            where: {
              college_id: req.body.id,
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
          const destination = "./storage/college_galleries/" + imgname;

          try {
            // Move the uploaded image to the server
            await imageData.mv(destination);

            // Save the image path to the database
            await Collegegallery.create({
              college_id: req.body.id,
              image: "college_galleries/" + imgname,
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


