const db = require("../models");
const path = require("path");
const school = db.school;
const _ = require("lodash");
const schoolaccreditations = db.schoolaccreditations;
const schoollevels = db.schoollevels;
const schooltype = db.schooltype;
const level = db.level;
const schoolamenities = db.schoolamenities;
const schoolmanagment = db.schoolmanagment;
const schoolaffiliations = db.schoolaffiliations;
const schoolrecognition = db.schoolrecognition;
const school_faqs = db.school_faqs;
const sendsearch = require("../utility/Customsearch");
const boardschools = db.boardschools;
const schoolgallery = db.schoolgallery;
const Op = db.Sequelize.Op;
// Array of allowed files
const fileTypes  = require("../config/fileTypes");
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

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.school_logo) {
      let avatar = req.files.school_logo;

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
        logonames = "school_logo/" + logoname;
      }
    }

    let total_seats =
      req.body.total_seats == "null" || req.body.total_seats == ""
        ? null
        : req.body.total_seats;
    let listingvalue =
      req.body.listing_order == 0 || req.body.listing_order == ""
        ? null
        : req.body.listing_order;
    const schoolDetails = await school.create({
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      // video_url: req.body.video_url ? req.body.video_url : null,
      // meta_title: req.body.meta_title ? req.body.meta_title : null,
      // meta_description: req.body.meta_description
      //   ? req.body.meta_description
      //   : null,
      // area_id: req.body.area_id,
      // // school_board_id: req.body.school_board_id,
      // city_id: req.body.city_id,
      // school_type_id: req.body.school_type_id,
      // // school_level_id: req.body.school_level_id,
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
      icon: req.body.icon,
      banner_image: req.body.banner_image,
      video_url: req.body.video_url,
      avg_rating: req.body.avg_rating,
      info: req.body.info,
      admissions_process: req.body.admissions_process,
      extracurriculars: req.body.extracurriculars,
      // banner_image: req.body.banner_image,
      // total_seats: total_seats,
      // listing_order: listingvalue,
      // about: req.body.about ? req.body.about : null,
      // extra_curricular: req.body.extra_curricular
      //   ? req.body.extra_curricular
      //   : null,
      // school_logo: logonames,
    });

    if (req.body.board_id && schoolDetails.id) {
      const boards = JSON.parse(req.body.board_id);
      _.forEach(boards, async function (value) {
        await boardschools.create({
          school_id: schoolDetails.id,
          board_id: value.board_id,
        });
      });
    }
    if (req.body.level_id && schoolDetails.id) {
      const levels = JSON.parse(req.body.level_id);
      _.forEach(levels, async function (value) {
        await schoollevels.create({
          school_id: schoolDetails.id,
          level_id: value.level_id,
        });
      });
    }
    if (req.body.accreditation_id && schoolDetails.id) {
      const acccredations = JSON.parse(req.body.accreditation_id);
      _.forEach(acccredations, function (value) {
        schoolaccreditations.create({
          school_id: schoolDetails.id,
          accreditation_id: value.accreditation_id,
        });
      });
    }
    if (req.body.amenities_id && schoolDetails.id) {
      const amenities = JSON.parse(req.body.amenities_id);
      _.forEach(amenities, function (value) {
        schoolamenities.create({
          school_id: schoolDetails.id,
          amenities_id: value.amenities_id ? value.amenities_id : null,
        });
      });
    }
    if (req.body.management_id && schoolDetails.id) {
      const management = JSON.parse(req.body.management_id);
      _.forEach(management, function (value) {
        schoolmanagment.create({
          school_id: schoolDetails.id,
          management_id: value.management_id,
        });
      });
    }
    if (req.body.recognition_id && schoolDetails.id) {
      const recognition = JSON.parse(req.body.recognition_id);
      _.forEach(recognition, function (value) {
        schoolrecognition.create({
          school_id: schoolDetails.id,
          recognition_id: value.recognition_id,
        });
      });
    }
    if (req.body.affiliations_id && schoolDetails.id) {
      const affiliations = JSON.parse(req.body.affiliations_id);
      _.forEach(affiliations, function (value) {
        schoolaffiliations.create({
          school_id: schoolDetails.id,
          affiliations_id: value.affiliations_id,
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
  const id = req.body.id;
  // console.log(id);
  // console.log(req.body);

  try {
    let logonames = "";
    let total_seats =
      req.body.total_seats == "null" || req.body.total_seats == ""
        ? null
        : req.body.total_seats;
    let listingvalue =
      req.body.listing_order == 0 || req.body.listing_order == ""
        ? null
        : req.body.listing_order;
    // console.log(total_seats);
    // console.log("total_seats");
    let STREAD = {
      school_name: req.body.school_name,
      school_slug: req.body.school_slug,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      // school_board_id: req.body.school_board_id,
      area_id: req.body.area_id,
      city_id: req.body.city_id,
      school_type_id: req.body.school_type_id,
      // school_level_id: req.body.school_level_id,
      genders_accepted: req.body.genders_accepted,
      established:
        req.body.established && req.body.established != "null"
          ? req.body.established
          : null,
      status: req.body.status ? req.body.status : null,
      address:
        req.body.address && req.body.address != "null"
          ? req.body.address
          : null,
      video_url:
        req.body.video_url && req.body.video_url != "null"
          ? req.body.video_url
          : null,
      map: req.body.map && req.body.map != "null" ? req.body.map : null,
      total_seats: total_seats,
      listing_order: listingvalue,
      about: req.body.about && req.body.about != "null" ? req.body.about : null,
      extra_curricular:
        req.body.extra_curricular && req.body.extra_curricular != "null"
          ? req.body.extra_curricular
          : null,
    };

    if (req.files && req.files.school_logo) {
      let avatar = req.files.school_logo;

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
        logonames = "school_logo/" + logoname;
      }
      STREAD["school_logo"] = logonames;
    }

    await school.update(STREAD, {
      where: { id },
    });

    if (req.body.board_id && id) {
      await boardschools.destroy({
        where: { school_id: id },
      });
      const boards = JSON.parse(req.body.board_id);
      await _.forEach(boards, async function (value) {
        await boardschools.create({
          school_id: id,
          board_id: value.board_id,
        });
      });
    }
    if (req.body.level_id && id) {
      await schoollevels.destroy({
        where: { school_id: id },
      });
      const levels = JSON.parse(req.body.level_id);
      await _.forEach(levels, async function (value) {
        await schoollevels.create({
          school_id: id,
          level_id: value.level_id,
        });
      });
    }

    if (req.body.accreditation_id && id) {
      await schoolaccreditations.destroy({
        where: { school_id: id },
      });
      const acccredations = JSON.parse(req.body.accreditation_id);
      await _.forEach(acccredations, async function (value) {
        await schoolaccreditations.create({
          school_id: id,
          accreditation_id: value.accreditation_id,
        });
      });
    }

    if (req.body.amenities_id && id) {
      await schoolamenities.destroy({
        where: { school_id: id },
      });
      const acccredations = JSON.parse(req.body.amenities_id);
      await _.forEach(acccredations, async function (value) {
        await schoolamenities.create({
          school_id: id,
          amenities_id: value.amenities_id,
        });
      });
    }

    if (req.body.management_id && id) {
      await schoolmanagment.destroy({
        where: { school_id: id },
      });
      const acccredations = JSON.parse(req.body.management_id);
      await _.forEach(acccredations, async function (value) {
        await schoolmanagment.create({
          school_id: id,
          management_id: value.management_id,
        });
      });
    }

    if (req.body.recognition_id && id) {
      await schoolrecognition.destroy({
        where: { school_id: id },
      });
      const recognition = JSON.parse(req.body.recognition_id);
      await _.forEach(recognition, async function (value) {
        await schoolrecognition.create({
          school_id: id,
          recognition_id: value.recognition_id,
        });
      });
    }
    if (req.body.affiliations_id && id) {
      await schoolaffiliations.destroy({
        where: { school_id: id },
      });
      const affiliations = JSON.parse(req.body.affiliations_id);
      await _.forEach(affiliations, async function (value) {
        await schoolaffiliations.create({
          school_id: id,
          affiliations_id: value.affiliations_id,
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
    searchText,
    searchfrom,
    city_id,
    area_id,
    school_type_id,
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

  var conditioncityid = city_id ? { city_id: city_id } : null;
  var conditionarea_id = area_id ? { area_id: area_id } : null;
  var conditionschool_type_id = school_type_id
    ? { school_type_id: school_type_id }
    : null;

  var condition = sendsearch.customseacrh(searchText, searchfrom);

  let data_array = [];
  conditioncityid ? data_array.push(conditioncityid) : null;
  conditionarea_id ? data_array.push(conditionarea_id) : null;
  conditionschool_type_id ? data_array.push(conditionschool_type_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  await school
    .findAndCountAll({
      distinct: true,
      where: data_array,
      limit,
      offset,
      // subQuery: false,
      include: [
        {
          required: false,
          association: "citys",
          attributes: ["id", "city_name"],
        },
        // {  required: false,association: "schoolboard", attributes: ["id", "name"] },
        {
          required: false,
          association: "areas",
          attributes: ["id", "area_name"],
        },
        {
          required: false,
          association: "schooltype",
          attributes: ["id", "type"],
        },
        // { association: "schoollevel", attributes: ["id", "level"] },
        {
          required: false,
          association: "boardschools",
          attributes: ["id", "board_id"],
          include: [
            {
              required: false,
              association: "schbrdname",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          required: false,
          association: "schoollevels",
          attributes: ["id", "level_id"],
          include: [
            {
              required: false,
              association: "schlevelname",
              attributes: ["id", "level_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolaccreditations",
          attributes: ["id", "accreditation_id"],
        },
        {
          required: false,
          association: "schoolamenities",
          attributes: ["id", "amenities_id"],
        },
        {
          required: false,
          association: "schoolmanagment",
          attributes: ["id", "management_id"],
        },
        {
          required: false,
          association: "schoolrecognition",
          attributes: ["id", "recognition_id"],
        },
        {
          required: false,
          association: "schoolaffiliations",
          attributes: ["id", "affiliations_id"],
        },
      ],
      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        // data: response,
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
        { association: "citys", attributes: ["id", "city_name"] },
        // { association: "schoolboard", attributes: ["id", "name"] },
        { association: "areas", attributes: ["id", "area_name"] },
        { association: "schooltype", attributes: ["id", "type"] },
        {
          association: "schfaqs",
          attributes: ["id", "questions", "answers"],
        },
        {
          required: false,
          association: "boardschools",
          attributes: ["id", "board_id"],
          include: [
            {
              required: false,
              association: "schbrdname",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          association: "schoollevels",
          attributes: ["id", "level_id"],
          include: [
            {
              association: "schlevelname",
              attributes: ["id", "level_name"],
            },
          ],
        },
        {
          association: "schoolaccreditations",
          attributes: ["id", "accreditation_id"],
          include: [
            {
              association: "schaccreditationname",
              attributes: ["id", "accreditation_name"],
            },
          ],
        },
        {
          association: "schoolamenities",
          attributes: ["id", "amenities_id"],
          include: [
            {
              association: "schamenitiename",
              attributes: ["id", "amenities_name", "amenities_logo"],
            },
          ],
        },
        {
          association: "schoolmanagment",
          attributes: ["id", "management_id"],
          include: [
            {
              association: "schmanagementname",
              attributes: ["id", "management_name"],
            },
          ],
        },
        {
          association: "schoolrecognition",
          attributes: ["id", "recognition_id"],
          include: [
            {
              association: "schrecognitionname",
              attributes: ["id", "recognition_approval_name"],
            },
          ],
        },
        {
          association: "schoolaffiliations",
          attributes: ["id", "affiliations_id"],
          include: [
            {
              association: "schaffiliationname",
              attributes: ["id", "other_affiliations_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolgallery",
          attributes: ["id", "image"],
        },
      ],
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

exports.schooltypefindAll = async (req, res) => {
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
  schooltype
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
exports.updatefaqs = async (req, res) => {
  try {
    if (req.body.schfaqs && req.body.id) {
      await school_faqs.destroy({
        where: { school_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.schfaqs);
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
    let oldimageids = [];
    if (req.body.oldimage) {
      let dataArray = JSON.parse(req.body.oldimage);
      if (dataArray && dataArray.length > 0) {
        oldimageids = dataArray.map((item) => item.id);
      }
    }

    let images = [];

    if (!req.files) {
      await schoolgallery.destroy({
        where: {
          school_id: req.body.id,
          id: {
            [Op.notIn]: oldimageids,
          },
        },
      });
      return res.status(200).send({
        status: 1,
        message: "olf files removed successfully",
      });
    }
    if (!req.body.id) {
      return res.status(400).send({
        message: "Invalid request, please provide gallery ID and image",
        status: 0,
      });
    }

    const avatar = req.files.image;

    if (Array.isArray(avatar)) {
      for (const element of avatar) {
        if (!array_of_allowed_file_types.includes(element.mimetype)) {
          return res.status(400).send({
            message: "Invalid file type",
            status: 0,
          });
        }

        if (element.size / (1024 * 1024) > allowed_file_size) {
          return res.status(400).send({
            message: "File too large",
            status: 0,
          });
        }

        const imgname =
          "image" + Date.now() + Math.random() + path.extname(element.name);
        // console.log("imgname",imgname);

        let isUploaded;
        try {
          await element.mv("./storage/schoolgallery/" + imgname);
          isUploaded = true;
        } catch (error) {
          isUploaded = false;
          console.error("File upload error: ", error);
        }
        if (isUploaded) {
          images.push("schoolgallery/" + imgname);
        }
      }
    } else {
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid file type",
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large",
          status: 0,
        });
      }

      const imgname = "image" + Date.now() + path.extname(avatar.name);

      let isUploaded;
      try {
        await avatar.mv("./storage/schoolgallery/" + imgname);
        isUploaded = true;
      } catch (error) {
        isUploaded = false;
        console.error("File upload error: ", error);
      }
      if (isUploaded) {
        images.push("schoolgallery/" + imgname);
      }
    }

    if (images.length === 0) {
      return res.status(400).send({
        message: "Please insert images",
        status: 0,
      });
    }

    // await schoolgallery.destroy({
    //   where: { school_id: req.body.id },
    //   id: { [Op.notIn]: [16,19] }
    // });
    await schoolgallery.destroy({
      where: {
        school_id: req.body.id,
        id: {
          [Op.notIn]: oldimageids,
        },
      },
    });
    for (const value of images) {
      await schoolgallery.create({
        school_id: req.body.id,
        image: value,
        // status: "featured",
      });
    }

    return res.status(200).send({
      status: 1,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Unable to process the request",
      status: 0,
    });
  }
};
