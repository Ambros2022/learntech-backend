require("dotenv").config();
const db = require("../../models");
const sendsearch = require("../../utility/Customsearch");
const state = db.state;
const news_categories = db.news_categories;
const stream = db.stream;
const countries = db.countries;
const enquiry = db.enquiry;
const college = db.college;
const school = db.school;



const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: finaldata } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, finaldata, totalPages, currentPage };
};

// exports.allstates = (req, res) => {
//   handleGenericRequest(req, res, db.state, ["id", "name", "country_id"], [{
//     required: false,
//     association: "city",
//     attributes: ["id", "name"]
//   }]);
// };


exports.allstates = async (req, res) => {
  const { page, size, searchtext, searchfrom, country_id, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];
  let conditionCountryId = country_id ? { country_id: country_id } : null;
  conditionCountryId ? data_array.push(conditionCountryId) : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  state
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "name",
        "country_id",
      ],

      include: [
        {
          required: false,
          association: "city",
          attributes: ["id", "name"],

        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving states.",
      });
    });
};

exports.allexams = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "name",

      ],
      include: [
        {
          required: false,
          association: "exam",
          attributes: ["id", "exam_title"],

        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving exams.",
      });
    });
};

exports.allabroadpages = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  countries
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "name",
      ],
      include: [
        {
          required: false,
          association: "abroadpages",
          attributes: ["id", "name"],

        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving abroad pages.",
      });
    });
};

exports.allnews = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  news_categories
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "name",
      ],
      include: [
        {
          required: false,
          association: "newsandevents",
          attributes: ["id", "banner_image", "meta_title", "meta_description"],

        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving news and events.",
      });
    });
};

exports.allstreams = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "name",
        "slug",
      ],

      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving streams.",
      });
    });
};



exports.searchbarhome = async (req, res) => {
  try {
    const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

    var column = columnname ? columnname : "id";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{status:"Published"}];
    var condition = sendsearch.customseacrh(searchtext, searchfrom);
    console.log(condition, "condition");
    condition ? data_array.push(condition) : null;

    const { limit, offset } = getPagination(page, size);
    const collegedata = await college.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug"],
      order: [orderconfig],
      limit,
      offset
    });
    const schooldata = await school.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug"],
      order: [orderconfig],
      limit,
      offset
    });

    const responseData = [];

    if (collegedata.count > 0) {
      responseData.push({
        type: "collegedata",
        data: collegedata.rows
      });
    }

    if (schooldata.count > 0) {
      responseData.push({
        type: "schooldata",
        data: schooldata.rows
      });
    }

    res.status(200).send({
      status: 1,
      message: "success",
      data: responseData,
    });

  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving streams.",
    });
  }
};

exports.enquiry = async (req, res) => {
  try {
    // Validate input data
    const { name, email, contact_number, location, course_in_mind, college_name, school_name, description, current_url } = req.body;



    // Create enquiry
    const enquiryDetails = await enquiry.create({
      name,
      email,
      contact_number: contact_number || null,
      location: location || null,
      course_in_mind: course_in_mind || null,
      college_name: college_name || null,
      school_name: school_name || null,
      description: description || null,
      current_url: current_url || null,
    });

    res.status(200).send({
      status: 1,
      message: "Enquiry created successfully",
      enquiryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 0,
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
};
