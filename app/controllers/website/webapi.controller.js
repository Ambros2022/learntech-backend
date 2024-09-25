require("dotenv").config();
const { where } = require("sequelize");
const db = require("../../models");
const path = require('path');
const sendsearch = require("../../utility/Customsearch");
const fileTypes = require("../../config/fileTypes");
const state = db.state;
const news_categories = db.news_categories;
const news_and_events = db.news_and_events;
const stream = db.stream;
const countries = db.countries;
const enquiry = db.enquiry;
const college = db.college;
const school = db.school;
const generalcourse = db.general_course;
const banner = db.banner;
const abroadpages = db.abroadpages;
const Op = db.Sequelize.Op;
const exam = db.exam;
const blog = db.blog;
const courses = db.courses;
const college_stream = db.college_stream;
// const videos = db.video_testimonials;
const schoolboards = db.schoolboards;
const scholarships = db.scholarships;
const page = db.page;
const video_testimonials = db.video_testimonials;
const { Sequelize } = require('sequelize');
const jobs_positions = db.jobs_positions;
const all_job_locations = db.all_job_locations;
const jobsenquires = db.jobs_enquires;
const our_teams = db.our_teams;
const PUBLISHED = 'Published';
const city = db.city;
const User = db.users;
const landing_pages = db.landing_pages;
const reviews = db.reviews;
const scholar_levels = db.scholar_levels;
const scholar_types = db.scholar_types;
const review_replies = db.review_replies;
// const jobs_positions = db.jobs_positions;
const alljoblocation = db.job_locations;
const _ = require('lodash');
const counsellorteam = db.counsellor_teams;
const organizationpages = db.organization_pages;

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
  const { count: totalItems, rows: finaldata } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, finaldata, totalPages, currentPage };
};


exports.allcountries = async (req, res) => {
  const { page, size, searchtext, searchfrom, india, columnname, orderby } = req.query;

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

  india ? data_array.push({
    name: {
      [Op.ne]: 'india'
    }
  }) : null;

  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  countries
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
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
          "Some error occurred while retrieving countries.",
      });
    });
};

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
      where: data_array, limit, offset,
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

exports.allstream_exams = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id", "exam_title", "slug"],
        where: { status: "Published" }
      }],
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
  abroadpages
    .findAndCountAll({
      where: data_array, limit, offset,
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
          "Some error occurred while retrieving abroad pages.",
      });
    });
};



exports.allstreams = async (req, res) => {
  const { page, size, searchtext, searchfrom, not_stream_id, columnname, orderby } = req.query;

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
  not_stream_id ? data_array.push({
    id: {
      [Op.ne]: not_stream_id
    }
  }
  ) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "logo",
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

exports.findOnestream = (req, res) => {
  const id = req.params.id;
  stream.findByPk(id, {
    include: [
      {
        required: false,
        association: "general_courses",
        attributes: ["id", "name", "slug", "short_name", "duration", "course_type"],
      },
      {
        required: false,
        association: "streamfaqs",
        attributes: ["id", "questions", "answers"],
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
          message: `Cannot find streams with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving streams with id=" + id,
      });
    });
};


exports.genralOnestream = (req, res) => {

  const { id, slug } = req.params;

  // Build the where clause based on the provided parameters
  let whereClause = {};
  if (id) whereClause.stream_id = id;
  if (slug) whereClause.slug = slug;

  generalcourse
    .findOne({
      where: whereClause,

      include: [
        {
          required: false,
          association: "streams",
          attributes: ["id", "name", "slug"],
        },
        {
          required: false,
          association: "generalcoursefaqs",
          attributes: ["id", "questions", "answers"],
        },
      ],
    })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: 'successfully retrieved',
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find course with the provided criteria.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err,
        message: 'Error retrieving course with the provided criteria',
      });
    });
};

exports.allcourses = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, college_id, course_type } = req.query;

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
  if (college_id) {
    data_array.push({ college_id: college_id });
  }
  if (course_type) {
    data_array.push({ course_type: course_type });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  courses
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "slug",
        // "college_id",
        // "course_type"
      ],
      order: [orderconfig],
      include: [

        {
          required: false,
          association: "generalcourse",
          attributes: ["id", "name"],
        },


      ],
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
          "Some error occurred while retrieving courses.",
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

    let data_array = [{ status: "Published" }];
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
  };
};

exports.allbanners = async (req, res) => {
  try {
    const { page, size, searchtext, searchfrom, columnname, orderby, promo_banner } = req.query;

    var column = columnname || "id";
    var order = orderby || "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (myArray.length > 1) {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [[table, column], order];
    }

    let data_array = [{ status: "Published" }];
    let conditionarray = [];

    if (promo_banner) {
      conditionarray.push({ promo_banner: promo_banner });
    }
    const condition = sendsearch.customseacrh(searchtext, searchfrom);
    if (condition) {
      data_array.push(condition);
    }

    const { limit, offset } = getPagination(page, size);
    const data = await banner.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray)
      },
      attributes: ["id", "title", "link", "image", "description"],
      order: [orderconfig],
      limit,
      offset
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
            "Some error occurred while retrieving banners.",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving banners.",
    });
  }
};

exports.newsandblogs = async (req, res) => {
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

  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const blogsPromise = blog.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug", "meta_description", "created_at"],
      order: [orderconfig],
      limit,
      offset
    });

    const newsPromise = news_and_events.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug", "meta_description", "created_at"],
      order: [orderconfig],
      limit,
      offset
    });

    const [blogsData, newsData] = await Promise.all([blogsPromise, newsPromise]);

    const blogsResponse = getPagingData(blogsData, page, limit);
    const newsResponse = getPagingData(newsData, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      blogs: {
        totalItems: blogsResponse.totalItems,
        currentPage: blogsResponse.currentPage,
        totalPages: blogsResponse.totalPages,
        data: blogsResponse.finaldata
      },
      news: {
        totalItems: newsResponse.totalItems,
        currentPage: newsResponse.currentPage,
        totalPages: newsResponse.totalPages,
        data: newsResponse.finaldata
      }
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving blogs and news."
    });
  }
};




exports.exploreCollege = async (req, res) => {
  const { page, size, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  const { limit, offset } = getPagination(page, size);
  try {
    // Count the total number of streams
    const totalItems = await stream.count();

    // Fetch the paginated data
    const data = await stream.findAll({
      attributes: ["id", "name", "slug", "logo", "listing_order"],
      include: [{
        required: false,
        association: "clgstreamm",
        attributes: ["college_id"],
      }],
      limit,
      offset,
      order: [orderconfig],
    });

    // Map the data to include the course count
    const formattedData = data.map(stream => {
      const courseCount = stream.clgstreamm.length;
      return {
        id: stream.id,
        name: stream.name,
        slug: stream.slug,
        logo: stream.logo,
        uniqueCollegeCount: courseCount,
      };
    });

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page ? +page : 1;

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems,
      currentPage,
      totalPages,
      data: formattedData,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore courses.",
    });
  }
};
exports.exploreexam = async (req, res) => {
  const { page, size, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  const { limit, offset } = getPagination(page, size);
  try {
    // Count the total number of streams
    const totalItems = await stream.count();

    // Fetch the paginated data
    const data = await stream.findAll({
      attributes: ["id", "name", "slug", "logo", "listing_order"],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id"],
      }],
      limit,
      offset,
      order: [orderconfig],
    });

    // Map the data to include the course count
    const formattedData = data.map(stream => {
      const courseCount = stream.exam.length;
      return {
        id: stream.id,
        name: stream.name,
        slug: stream.slug,
        logo: stream.logo,
        uniqueCollegeCount: courseCount,
      };
    });

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page ? +page : 1;

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems,
      currentPage,
      totalPages,
      data: formattedData,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore courses.",
    });
  }
};
exports.explorecourses = async (req, res) => {
  const { page, size, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  const { limit, offset } = getPagination(page, size);
  console.log(limit, offset);

  try {
    // Count the total number of streams
    const totalItems = await stream.count();

    // Fetch the paginated data
    const data = await stream.findAll({
      attributes: ["id", "name", "slug", "logo", "listing_order"],
      include: [{
        required: false,
        association: "general_courses",
        attributes: ["id"],
      }],
      limit,
      offset,
      order: [orderconfig],
    });

    // Map the data to include the course count
    const formattedData = data.map(stream => {
      const courseCount = stream.general_courses.length;
      return {
        id: stream.id,
        name: stream.name,
        slug: stream.slug,
        logo: stream.logo,
        uniqueCollegeCount: courseCount,
      };
    });

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page ? +page : 1;

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems,
      currentPage,
      totalPages,
      data: formattedData,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore courses.",
    });
  }
};









exports.allcolleges = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    country_id,
    state_id,
    city_id,
    type,
    college_type,
    is_associated,
    home_view_status,
    columnname,
    orderby,
    course_type,
    general_course_id,
    stream_id
  } = req.query;

  let column = columnname || "id";
  let order = orderby || "ASC";
  let orderconfig = [column, order];

  const myArray = column.split(".");
  if (myArray[1] !== undefined) {
    const table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let data_array = [{ status: "Published" }];


  if (is_associated) {
    data_array.push({ is_associated });
  }
  if (home_view_status) {
    data_array.push({ home_view_status });
  }

  if (type) {
    data_array.push({ type });
  }

  if (college_type) {
    data_array.push({ college_type });
  }


  if (country_id) data_array.push({ country_id: JSON.parse(country_id) });
  if (state_id) data_array.push({ state_id: JSON.parse(state_id) });
  if (city_id) data_array.push({ city_id: JSON.parse(city_id) });


  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) data_array.push(condition);

  let includearray = [
  ];

  if (course_type) {
    includearray.push({
      required: true,
      association: "courses",
      attributes: ["id"],
      where: {
        course_type: JSON.parse(course_type)
      }
    });
  }
  if (general_course_id) {
    includearray.push({
      required: true,
      association: "courses",
      attributes: ["id"],
      where: {
        general_course_id: JSON.parse(general_course_id)
      }
    });
  }

  if (stream_id) {
    includearray.push({
      association: "collegestreams",
      required: true,
      attributes: ["id"],
      where: {
        stream_id: JSON.parse(stream_id)
      }
    });
  }


  const { limit, offset } = getPagination(page, size);

  try {
    const data = await college.findAndCountAll({
      where: {
        [Op.and]: data_array,
      },
      attributes: ["id", "name", "slug", "city_id", "state_id", "address", "banner_image", "established", "college_type", "avg_rating"],
      include: includearray,
      order: [orderconfig],
      limit,
      offset,
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving colleges.",
    });
  }
};



exports.collegefindOne = (req, res) => {
  const id = req.params.id;
  college.findByPk(id, {
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
            attributes: ["id", "amenities_name", "amenities_logo"],
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

exports.courses = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "general_courses",
        attributes: ["id", "name", "slug"],
        where: { status: "Published" }
      }],
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
          "Some error occurred while retrieving courses.",
      });
    });
};

exports.coursefindone = (req, res) => {
  console.log(req.params);
  const { id, slug } = req.params;

  // Build the where clause based on the provided parameters
  let whereClause = {};
  if (id) whereClause.college_id = id;
  if (slug) whereClause.slug = slug;

  courses
    .findOne({
      where: whereClause,
      attributes: ['id', 'slug', 'meta_title', 'meta_description', 'meta_keywords', 'course_details', 'eligibility', 'fee_structure'],
      include: [
        {
          required: false,
          association: 'college',
          attributes: ['id', 'name', 'slug'],
        },
        {
          required: false,
          association: 'generalcourse',
          attributes: ['id', 'name', 'stream_id'],
        },
      ],
    })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: 'successfully retrieved',
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find course with the provided criteria.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err,
        message: 'Error retrieving course with the provided criteria',
      });
    });
};


exports.allschools = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    country_id,
    state_id,
    city_id,
    columnname,
    orderby,
    school_type,
    home_view_status,
  } = req.query;

  let column = columnname || "id";
  let order = orderby || "ASC";
  let orderconfig = [column, order];

  const myArray = column.split(".");
  if (myArray[1] !== undefined) {
    const table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let data_array = [{ status: "Published" }];

  if (school_type) {
    data_array.push({ school_type });
  }

  if (home_view_status) {
    data_array.push({ home_view_status });
  }


  if (country_id) data_array.push({ country_id: JSON.parse(country_id) });
  if (state_id) data_array.push({ state_id: JSON.parse(state_id) });
  if (city_id) data_array.push({ city_id: JSON.parse(city_id) });


  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) data_array.push(condition);

  let includearray = [];

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await school.findAndCountAll({
      where: {
        [Op.and]: data_array,
      },
      attributes: ["id", "name", "city_id", "established", "icon", "school_type"],
      include: includearray,
      order: [orderconfig],
      limit,
      offset,
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving schools.",
    });
  }
};

exports.schoolfindone = (req, res) => {
  const id = req.params.id;
  school
    .findByPk(id, {
      attributes: ['id', 'country_id', 'state_id', 'city_id', 'name', 'slug', 'icon', 'banner_image', 'info', 'admissions_process', 'extracurriculars', 'map', 'video_url', 'address', 'established'],
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
              attributes: ["id", "amenities_name", "amenities_logo"],
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
          attributes: ["id", "questions", "answers"],
        },

      ],

    })
    .then((data) => {
      if (data) {

        res.status(200).send({
          status: 1,
          message: "Successfully retrieved",
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

exports.abroadpages = async (req, res) => {
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
  abroadpages
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "country_id",
        "name",
        "slug",
      ],
      include: [
        {
          required: false,
          association: "country",
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

exports.abroadcollegefindone = (req, res) => {
  const slug = req.params.slug;

  abroadpages.findOne({
    where: { slug: slug },
    include: [
      {
        required: false,
        association: "country",
        attributes: ["id", "name"],
      },
      {
        required: false,
        association: "abroadpagefaqs",
        attributes: ["id", "questions", "answers"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: "Successfully retrieved",
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find abroadpages with slug=${slug}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving abroadpages with slug=" + slug,
      });
    });
};


exports.allentranceexams = async (req, res) => {
  const { page, size, searchtext, searchfrom, stream_id, columnname, orderby, promo_banner_status, country_id, level_of_study, types_of_exams } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [{ status: "Published" }];

  if (promo_banner_status) {
    data_array.push({ promo_banner_status });
  }

  if (country_id) {
    data_array.push({ country_id });
  }

  if (level_of_study) {
    data_array.push({ level_of_study });
  }

  if (types_of_exams) {
    data_array.push({ types_of_exams });
  }

  if (stream_id) data_array.push({ stream_id: JSON.parse(stream_id) });

  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) data_array.push(condition);

  const { limit, offset } = getPagination(page, size);
  exam
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "exam_title",
        "slug",
        "exam_short_name",
        "cover_image",
        "stream_id",
        "country_id",
        "level_of_study",
        "types_of_exams",
        "upcoming_date",
        "created_at",
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

exports.findoneexam = (req, res) => {
  const id = req.params.id;
  exam.findByPk(id, {
    // attributes: ['id', 'exam_title', 'slug'],
    include: [
      {
        required: false,
        association: "examfaqs",
        attributes: ["id", "questions", "answers"],
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
          message: `Cannot find exams with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving exams with id=" + id,
      });
    });
};

exports.news = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, category_id, country_id, includeIndia } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [{ status: "Published" }];


  if (country_id) {
    if (country_id === "204" && includeIndia === "true") {
      data_array.push({ country_id: "204" });
    } else if (country_id !== "204" && includeIndia === "false") {
      data_array.push({ country_id: { [Op.ne]: "204" } });
    }
  } else {
    if (includeIndia === "true") {
      data_array.push({ country_id: "204" });
    } else if (includeIndia === "false") {
      data_array.push({ country_id: { [Op.ne]: "204" } });
    }
  }

  if (category_id) {
    data_array.push({ category_id });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  news_and_events
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "banner_image",
        "meta_description",
        "pdf_file",
        "created_at",
        "category_id",
        "country_id",
      ],
      include: [
        {
          required: false,
          association: "newscategories",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "country",
          attributes: [
            "id",
            "name",

          ],
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

exports.newscategory = async (req, res) => {
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
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "created_at",
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
          "Some error occurred while retrieving news category.",
      });
    });
};

exports.newsfindone = (req, res) => {
  const id = req.params.id;
  news_and_events
    .findByPk(id, {
      attributes: ['id', 'banner_image', 'meta_title', 'pdf_file', 'meta_description', 'overview'],
      include: [
        {
          required: false,
          association: "newscategories",
          attributes: ["id", "name"],
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
          message: `Cannot find newsandevents with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving newsandevents with id=" + id,
      });
    });
};

exports.blogs = async (req, res) => {
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
  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  blog
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "banner_image",
        "meta_title",
        "meta_description",
        "created_at",
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

exports.blogfindone = (req, res) => {
  const id = req.params.id;
  blog
    .findByPk(id, {
      attributes: ['id', 'name', 'slug', 'banner_image', 'meta_title', 'meta_description', 'created_at', 'overview'],

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
          message: `Cannot find blog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err.message,
        message: "Error retrieving blog with id=" + id,
      });
    });
};

exports.schoolboards = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, board_type } = req.query;

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



  if (board_type) {
    data_array.push({ board_type });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  schoolboards
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "board_type",
        "country_id",
        "state_id",
        "city_id",
        "gender",
        "logo",
        "established",
        "gender",
        "info",
        "time_table",
        "reg_form",
        "syllabus",
        "results",
        "sample_paper",
        "created_at",
        "result_date",
        "address",
        "map",
        "short_name",
      ],
      include: [

        {
          required: false,
          association: "schoolboardfaqs",
          attributes: ["id", "questions", "answers"],
        },
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
          association: "boardrecognitions",
          attributes: ["id", "recognition_id"],
          include: [
            {
              association: "brdrecognitions",
              attributes: ["id", "recognition_approval_name"],
            },
          ],
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
          "Some error occurred while retrieving schoolboards.",
      });
    });
};

exports.schoolboardfindone = (req, res) => {
  const id = req.params.id;
  schoolboards.findByPk(id, {
    attributes: [
      "id",
      "name",
      "board_type",
      "logo",
      "established",
      "gender",
      "info",
      "time_table",
      "reg_form",
      "syllabus",
      "results",
      "sample_paper",
      "result_date",
      "address",
      "map",
      "short_name",
    ],
    include: [

      {
        required: false,
        association: "schoolboardfaqs",
        attributes: ["id", "questions", "answers"],
      },
      {
        required: false,
        association: "boardrecognitions",
        attributes: ["id", "recognition_id"],
        include: [
          {
            association: "brdrecognitions",
            attributes: ["id", "recognition_approval_name"],
          },
        ],
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
          message: `Cannot find schoolboards with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving schoolboards with id=" + id,
      });
    });
};

exports.scholarships = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, gender, level_id, type_id, country_id } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [{ status: "Published" }];

  if (gender) {
    data_array.push({ gender });
  }


  if (level_id) data_array.push({ level_id: JSON.parse(level_id) });
  if (type_id) data_array.push({ type_id: JSON.parse(type_id) });
  if (country_id) data_array.push({ country_id: JSON.parse(country_id) });



  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  scholarships
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "gender",
        "is_eligible",
        "logo",
        "meta_title",
        "meta_description",
        "type_id",
        "level_id",
        "amount",
        "total_scholarships",
        "last_date",
      ],
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholarlevels",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholartypes",
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
          "Some error occurred while retrieving scholarships.",
      });
    });
};

exports.scholarshipfindone = (req, res) => {
  const id = req.params.id;
  scholarships
    .findByPk(id, {
      attributes: [
        "id",
        "name",
        "slug",
        "gender",
        "is_eligible",
        "logo",
        "meta_title",
        "meta_description",
        "overview",
        "last_date",
        "amount",
      ],
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholarlevels",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholartypes",
          attributes: ["id", "name"],
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
          message: `Cannot find scholarships with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving scholarships with id=" + id,
      });
    });
};

exports.pagefindone = (req, res) => {
  const slug = req.params.url;  // Assuming the slug is passed as a URL parameter

  page.findOne({ where: { url: slug } })
    .then(data => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: 'successfully retrieved',
          data: data
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find page with slug=${slug}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Page with slug=" + slug
      });
    });
};


exports.videotestimonial = async (req, res) => {
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
  video_testimonials
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "title",
        "name",
        "designation",
        "video_url",
        "full_url",
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
          "Some error occurred while retrieving video testimonials.",
      });
    });
};

exports.allgeneralcourses = async (req, res) => {
  const { page, size, searchtext, stream_id, is_trending, is_top_rank, searchfrom, columnname, orderby } = req.query;

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
  stream_id ? data_array.push({ stream_id: stream_id }) : null;
  is_trending ? data_array.push({ is_trending: is_trending }) : null;
  is_top_rank ? data_array.push({ is_top_rank: is_top_rank }) : null;
  const { limit, offset } = getPagination(page, size);
  generalcourse
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "short_name",
        "slug",
      ],
      include: [
        {
          required: false,
          association: "streams",
          attributes: ["id", "name", "slug"],
        },
      ],
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving video testimonials.",
      });
    });
};

exports.streamGeneralcourse = async (req, res) => {
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
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "logo",
      ],
      include: [
        {
          required: false,
          where: [{ is_top_rank: "1" }],
          limit: 2,
          association: "general_courses",
          attributes: ["id", "short_name", "slug"],
        },
      ],
      order: [orderconfig],
      subQuery: false
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
exports.jobpositions = async (req, res) => {
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
  let data_array = [{ status: "Published" }];



  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  jobs_positions
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "job_description",
        "exp_required",
        "total_positions",
      ],
      include: [
        {
          required: false,
          association: "jobpositionlocation",
          attributes: ["id", "job_location_id"],
          include: [
            {
              required: false,
              association: "jobpositionslocation",
              attributes: ["id", "name"],
            },
          ],
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
          "Some error occurred while retrieving job positions.",
      });
    });
};

exports.alljoblocations = async (req, res) => {
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
  let data_array = [{ status: "Published" }];



  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  all_job_locations
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
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
          "Some error occurred while retrieving all job locations.",
      });
    });
};

exports.addjobenquires = async (req, res) => {
  try {
    let resumes = "";

    if (req.files && req.files.resume) {
      let avatar = req.files.resume;

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

      let IsUpload = avatar.mv("./storage/jobenquiry_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        resumes = "jobenquiry_image/" + logoname;
      }
    }

    const jobsenquiresDetails = await jobsenquires.create({
      jobs_position_id: req.body.jobs_position_id,
      job_location_id: req.body.job_location_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      d_o_b: req.body.d_o_b,
      current_location: req.body.current_location,
      total_exp: req.body.total_exp,
      resume: resumes,
      status: req.body.status,
    });
    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: jobsenquiresDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.ourteams = async (req, res) => {
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
  our_teams
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "designation",
        "linked_in_link",
        "image",
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
          "Some error occurred while retrieving all our teams.",
      });
    });
};

// exports.dashboard = async (req, res) => {


//   const Total_colleges = await college.count({
//     where: {
//       type: "college"
//     }
//   });
//   const Total_universitys = await college.count({
//     where: {
//       type: "university"
//     }
//   });
//   const total_Users = await User.count();
//   const total_country = await countries.count();
//   const total_states = await state.count();
//   const total_cities = await city.count();
//   const total_schools = await school.count();
//   const total_streams = await stream.count();
//   const total_generalcourses = await generalcourse.count();
//   const total_abroadpage = await abroadpages.count();
//   const total_exams = await exam.count();
//   const total_course = await courses.count();
//   const total_enquires = await enquiry.count();
//   const total_blogs = await blog.count();
//   const total_jobs_position = await jobs_positions.count();
//   const total_schoolboard = await schoolboards.count();
//   const total_scholarship = await scholarships.count();

//   const Published_colleges = await college.count({
//     where: {
//       status: "PUBLISHED",
//       type: "college"
//     }
//   });
//   const Published_universities = await college.count({
//     where: {
//       status: "PUBLISHED",
//       type: "university"
//     }
//   });
//   const Published_school = await school.count({
//     where: {
//       status: "PUBLISHED"
//     }
//   });
//   const Published_courses = await courses.count({
//     where: {
//       status: "PUBLISHED"
//     }
//   });
//   const Published_exam = await exam.count({
//     where: {
//       status: "PUBLISHED"
//     }
//   });
//   const Published_scholarships = await scholarships.count({
//     where: {
//       status: "PUBLISHED"
//     }
//   });
//   const Published_blog = await blog.count({
//     where: {
//       status: "PUBLISHED"
//     }
//   });



//   res.status(200).send({
//     status: 1,
//     message: "success",
//     data: {
//       Users: total_Users,
//       Total_colleges: Total_colleges,
//       Published_colleges: Published_colleges,
//       Total_universitys: Total_universitys,
//       Published_universities: Published_universities,
//       countries: total_country,
//       state: total_states,
//       city: total_cities,
//       school: total_schools,
//       Published_school: Published_school,
//       stream: total_streams,
//       generalcourse: total_generalcourses,
//       abroadpages: total_abroadpage,
//       exam: total_exams,
//       Published_exam: Published_exam,
//       courses: total_course,
//       Published_courses: Published_courses,
//       enquiry: total_enquires,
//       blog: total_blogs,
//       Published_blog: Published_blog,
//       jobs_positions: total_jobs_position,
//       schoolboards: total_schoolboard,
//       scholarships: total_scholarship,
//       Published_scholarships: Published_scholarships,




//     }
//   });
// };


exports.dashboard = async (req, res) => {
  try {
    const [
      totalColleges,
      totalUniversities,
      totalUsers,
      totalCountry,
      totalStates,
      totalCities,
      totalSchools,
      totalStreams,
      totalGeneralCourses,
      totalAbroadPages,
      totalExams,
      totalCourses,
      totalEnquiries,
      totalBlogs,
      totalJobsPositions,
      totalSchoolBoards,
      totalScholarships,
      publishedColleges,
      publishedUniversities,
      publishedSchool,
      publishedCourses,
      publishedExams,
      publishedScholarships,
      publishedBlogs,
      totalnews,
      publishednews,
      totallandingpage,
      publishedlandingpage,

    ] = await Promise.all([
      college.count({ where: { type: "college" } }),
      college.count({ where: { type: "university" } }),
      User.count(),
      countries.count(),
      state.count(),
      city.count(),
      school.count(),
      stream.count(),
      generalcourse.count(),
      abroadpages.count(),
      exam.count(),
      courses.count(),
      enquiry.count(),
      blog.count(),
      jobs_positions.count(),
      schoolboards.count(),
      scholarships.count(),
      college.count({ where: { status: "PUBLISHED", type: "college" } }),
      college.count({ where: { status: "PUBLISHED", type: "university" } }),
      school.count({ where: { status: "PUBLISHED" } }),
      courses.count({ where: { status: "PUBLISHED" } }),
      exam.count({ where: { status: "PUBLISHED" } }),
      scholarships.count({ where: { status: "PUBLISHED" } }),
      blog.count({ where: { status: "PUBLISHED" } }),
      news_and_events.count(),
      news_and_events.count({ where: { status: "PUBLISHED" } }),
      landing_pages.count(),
      landing_pages.count({ where: { status: "PUBLISHED" } }),
    ]);

    res.status(200).send({
      status: 1,
      message: "success",
      data: {
        Users: totalUsers,
        Total_colleges: totalColleges,
        Published_colleges: publishedColleges,
        Total_universitys: totalUniversities,
        Published_universities: publishedUniversities,
        countries: totalCountry,
        state: totalStates,
        city: totalCities,
        school: totalSchools,
        Published_school: publishedSchool,
        stream: totalStreams,
        generalcourse: totalGeneralCourses,
        abroadpages: totalAbroadPages,
        exam: totalExams,
        Published_exam: publishedExams,
        courses: totalCourses,
        Published_courses: publishedCourses,
        enquiry: totalEnquiries,
        blog: totalBlogs,
        Published_blog: publishedBlogs,
        jobs_positions: totalJobsPositions,
        schoolboards: totalSchoolBoards,
        scholarships: totalScholarships,
        Published_scholarships: publishedScholarships,
        Total_news: totalnews,
        Published_news: publishednews,
        Total_landingpage: totallandingpage,
        Published_landingpage: publishedlandingpage,
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send({
      status: 0,
      message: "An error occurred",
      error: error.message
    });
  }
};

exports.addreview = async (req, res) => {
  try {

    const reviewsDetails = await reviews.create({
      name: req.body.name,
      userrating: req.body.userrating,
      user_id: req.body.user_id,
      content: req.body.content,
      is_approved: req.body.is_approved,
      passing_year: req.body.passing_year,
      review_type: req.body.review_type,
      college_id: req.body.college_id,
      course_id: req.body.course_id,
      course_type: req.body.course_type,
      school_id: req.body.school_id,
      school_board_id: req.body.school_board_id,
      grade: req.body.grade,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      is_reported: req.body.is_reported,
    });

    res.status(200).send({
      status: 1,
      message: 'Thankyou Review Submitted Successfully',
      data: reviewsDetails
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to insert data',
      errors: error,
      status: 0
    });
  }
};

exports.collegereview = async (req, res) => {
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
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await college.findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "slug",
        "type",
        "avg_rating",
      ],
      include: [
        {
          required: false,
          association: "reviewcollege",
          attributes: ["id", "name", "userrating", "likes", "dislikes", "is_reported"],
          where: { is_approved: true },
        },
      ],
      order: [orderconfig],
      subQuery: false
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving collegereview.",
    });
  }
};

exports.addreviewreply = async (req, res) => {
  try {

    const reviewrepliesDetails = await review_replies.create({
      content: req.body.content,
      user_id: req.body.user_id,
      review_id: req.body.review_id,
    });

    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: reviewrepliesDetails
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to insert data',
      errors: error,
      status: 0
    });
  }
};

exports.sitemap = async (req, res) => {
  const data = {
    errors: {},
  };
  data.college = [];
  data.university = [];
  data.school = [];
  data.scholarships = [];
  data.schoolboards = [];
  data.generalcourse = [];
  data.stream = [];
  data.exam = [];
  data.blog = [];
  data.newsandevents = [];


  const {
    page,
    size,
    columnname,
    orderby,
  } = req.body;

  const { limit, offset } = getPagination(page, size);

  if (data.college) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "college" }, { status: PUBLISHED }];

    try {
      data.college = await college.findAll({
        where: data_array, limit, offset,


        attributes: ["id", "name", "slug", "updated_at"],

        subQuery: false,
      })

        .then((data) => {

          return data;
        })
        .catch((err) => {
        });
    } catch {
    }
  }

  if (data.university) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "university" }, { status: PUBLISHED }];

    try {
      data.university = await college.findAll({
        where: data_array, limit, offset,

        attributes: ["id", "name", "slug", "updated_at"],

        subQuery: false,
      })

        .then((data) => {

          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }

  if (data.school) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.school = await school
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {

          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }

  if (data.scholarships) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.scholarships = await scholarships
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {


          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }


  if (data.schoolboards) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.schoolboards = await schoolboards
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {


          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }

  if (data.generalcourse) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.generalcourse = await generalcourse
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {


          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }



  if (data.stream) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.stream = await stream
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],

          subQuery: false,
        })

        .then((data) => {

          return data;
        })
        .catch((err) => {
        });
    } catch {

    }
  }

  if (data.exam) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.exam = await exam
        .findAll({
          where: data_array,

          attributes: ["id", "exam_title", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {

          return data;
        })
        .catch((err) => {
        });
    } catch {

    }
  }

  if (data.blog) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.blog = await blog
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],

          subQuery: false,
        })

        .then((data) => {

          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }

  if (data.newsandevents) {
    var column = columnname ? columnname : "title";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.newsandevents = await news_and_events
        .findAll({
          where: data_array,

          attributes: ["id", "name", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {

          return data;
        })
        .catch((err) => {

        });
    } catch {

    }
  }



  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

exports.allreview = async (req, res) => {
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
  let data_array = [{ is_approved: 1 }];


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await reviews.findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "userrating",
        "user_id",
        "content",
        "is_approved",
        "passing_year",
        "review_type",
        "college_id",
        "course_id",
        "course_type",
        "school_id",
        "school_board_id",
        "grade",
        "likes",
        "dislikes",
        "is_reported",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          required: false,
          association: "clgreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "reviewuser",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "sclreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "sclbrdreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "coursereview",
          attributes: ["id", "slug"],
        },
        {
          required: false,
          association: "reviewreply",
          attributes: ["id", "user_id", "content"],
          include: [
            {
              association: "reviewrply",
              attributes: ["id", "name"],
            },
          ],
        },
      ],

      order: [orderconfig],
      subQuery: false
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving review.",
    });
  }
};

exports.reviewrating = async (req, res) => {
  const { college_id, school_id } = req.query;

  try {
    const filterCondition = college_id ? { college_id: college_id } : { school_id: school_id };

    const collegeAggregates = await reviews.findAll({
      where: filterCondition,
      attributes: [
        college_id ? "college_id" : "school_id",
        [Sequelize.fn("AVG", Sequelize.col("userrating")), "avgRating"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalReviews"],
      ],
      group: [college_id ? "college_id" : "school_id"],
      raw: true,
    });

    const ratingCounts = await reviews.findAll({
      where: filterCondition,
      attributes: [
        college_id ? "college_id" : "school_id",
        "userrating",
        [Sequelize.fn("COUNT", Sequelize.col("userrating")), "ratingCount"],
      ],
      group: [college_id ? "college_id" : "school_id", "userrating"],
      raw: true,
    });

    const totalLikesDislikes = collegeAggregates.map(item => ({
      college_id: item.college_id,
      school_id: item.school_id,
      avgRating: Math.round(parseFloat(item.avgRating)),
      totalReviews: parseInt(item.totalReviews),
    }));

    const ratingsGroupedByCollege = ratingCounts.reduce((acc, item) => {
      const idKey = college_id ? 'college_id' : 'school_id';
      if (!acc[item[idKey]]) {
        acc[item[idKey]] = {
          [idKey]: item[idKey],
          ratings: {}
        };
      }
      acc[item[idKey]].ratings[item.userrating] = parseInt(item.ratingCount);
      return acc;
    }, {});

    res.status(200).send({
      status: 1,
      message: "success",
      totalLikesDislikes: totalLikesDislikes,
      ratingCounts: ratingsGroupedByCollege
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving review.",
    });
  }
};

exports.findreview = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, college_id, school_id } = req.query;

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
  if (condition) {
    data_array.push(condition);
  }

  if (college_id) {
    data_array.push({ college_id });
  }

  if (school_id) {
    data_array.push({ school_id });
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await reviews.findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "user_id",
        "userrating",
        "content",
        "is_approved",
        "passing_year",
        "college_id",
        "school_id",
        "likes",
        "dislikes",
        "created_at",
      ],
      include: [
        {
          required: false,
          association: "clgreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "reviewuser",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "sclreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "sclbrdreview",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "coursereview",
          attributes: ["id", "slug"],
        },
        {
          required: false,
          association: "reviewreply",
          attributes: ["id", "user_id", "content"],
          include: [
            {
              association: "reviewrply",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      order: [orderconfig],
      subQuery: false
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving review.",
    });
  }
};

exports.statusupdate = async (req, res) => {
  const { id, is_approved } = req.body;

  if (id === undefined) {
    return res.status(400).send({
      status: 0,
      message: 'ID is a required field'
    });
  }

  try {
    const review = await reviews.findOne({ where: { id: id } });

    if (!review) {
      return res.status(404).send({
        status: 0,
        message: 'Review not found'
      });
    }

    const previousIsApproved = review.is_approved;
    let updatedIsApproved;

    if (is_approved === undefined) {
      updatedIsApproved = !previousIsApproved;
    } else {
      updatedIsApproved = is_approved;
    }

    await reviews.update(
      { is_approved: updatedIsApproved },
      { where: { id: id } }
    );
    // console.log(reviews, "reviews");
    if (previousIsApproved !== updatedIsApproved) {
      const collegeId = review.college_id;
      const schoolId = review.school_id;

      const collegeReviews = await reviews.findAll({
        where: { college_id: collegeId, is_approved: true }
      });

      const totalCollegeRating = collegeReviews.reduce((acc, curr) => acc + curr.userrating, 0);
      const avgCollegeRating = collegeReviews.length ? Math.round(totalCollegeRating / collegeReviews.length) : 0;
      await college.update(
        { avg_rating: avgCollegeRating },
        { where: { id: collegeId } }
      );

      if (schoolId) {
        const schoolReviews = await reviews.findAll({
          where: { school_id: schoolId, is_approved: true }
        });

        const totalSchoolRating = schoolReviews.reduce((acc, curr) => acc + curr.userrating, 0);
        const avgSchoolRating = schoolReviews.length ? Math.round(totalSchoolRating / schoolReviews.length) : 0;

        await school.update(
          { avg_rating: avgSchoolRating },
          { where: { id: schoolId } }
        );
      }
    }

    res.status(200).send({
      status: 1,
      message: 'is_approved field updated successfully and average rating updated'
    });

  } catch (error) {
    res.status(500).send({
      status: 0,
      message: 'Unable to update data',
      errors: error.message
    });
  }
};

exports.likesUpdate = async (req, res) => {
  const { id, like, dislike } = req.body;

  if (id === undefined) {
    return res.status(400).send({
      status: 0,
      message: 'ID is a required field'
    });
  }

  try {
    const review = await reviews.findOne({ where: { id: id } });

    if (!review) {
      return res.status(404).send({
        status: 0,
        message: 'Review not found'
      });
    }

    const updatedReviewData = {
      likes: review.likes,
      dislikes: review.dislikes
    };

    if (like !== undefined) {
      if (like) {
        updatedReviewData.likes += 1;
        updatedReviewData.dislikes = Math.max(0, updatedReviewData.dislikes - 1);
      } else {
        updatedReviewData.likes = Math.max(0, updatedReviewData.likes - 1);
      }
    }

    if (dislike !== undefined) {
      if (dislike) {
        updatedReviewData.dislikes += 1;
        updatedReviewData.likes = Math.max(0, updatedReviewData.likes - 1);
      } else {
        updatedReviewData.dislikes = Math.max(0, updatedReviewData.dislikes - 1);
      }
    }

    await reviews.update(
      updatedReviewData,
      { where: { id: id } }
    );

    res.status(200).send({
      status: 1,
      message: 'Review updated successfully',
      updatedReview: updatedReviewData
    });

  } catch (error) {
    res.status(500).send({
      status: 0,
      message: 'Unable to update data',
      errors: error.message
    });
  }
};

exports.scholarlevel = async (req, res) => {
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
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await scholar_levels.findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
      ],
      order: [orderconfig],
      subQuery: false
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving scholarlevels.",
    });
  }
};

exports.scholartype = async (req, res) => {
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
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await scholar_types.findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "name",
      ],
      order: [orderconfig],
      subQuery: false
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving scholartypes.",
    });
  }
};

exports.addjobposition = async (req, res) => {

  try {
    const jobspositionsDetails = await jobs_positions.create({
      name: req.body.name,
      job_description: req.body.job_description,
      exp_required: req.body.exp_required,
      total_positions: req.body.total_positions,
      status: req.body.status,

    });

    if (req.body.joblocations && jobspositionsDetails.id) {
      const joblocation = JSON.parse(req.body.joblocations);
      _.forEach(joblocation, async function (value) {

        await alljoblocation.create({
          job_location_id: value.id,
          jobs_position_id: jobspositionsDetails.id,
        });
      });
    }



    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: jobspositionsDetails
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to insert data',
      errors: error,
      status: 0
    });
  }
};

exports.allcities = async (req, res) => {
  const { page, size, searchtext, searchfrom, state_id, columnname, orderby } = req.query;

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

  if (state_id) {
    data_array.push({ state_id: state_id });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  city
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "state_id",
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
          "Some error occurred while retrieving cities.",
      });
    });
};

exports.counsellorteams = async (req, res) => {
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
  counsellorteam
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "location",
        "experience",
        "description",
        "image",
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
          "Some error occurred while retrieving counsellor team.",
      });
    });
};

exports.organizationpages = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, categories, orderby } = req.query;

  let column = columnname || 'id';
  let order = orderby || 'ASC';
  let orderconfig = [column, order];

  const myArray = column.split(".");
  if (myArray.length > 1) {
    const table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let data_array = [];
  if (categories) {
    data_array.push({ categories: categories });
  }

  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const organizationPagesData = await organizationpages.findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        {
          required: false,
          association: "organizatiopagesteps",
          attributes: ["id", "title", "description", "icon", "order_by"],
        },
      ],
      order: [orderconfig],
    });

    const totalItems = await organizationpages.count({
      where: data_array,
    });

    const response = getPagingData(organizationPagesData, page, limit);
    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving organization pages."
    });
  }
};

