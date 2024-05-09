require("dotenv").config();
const db = require("../../models");
const sendsearch = require("../../utility/Customsearch");
const state = db.state;
const news_categories = db.news_categories;
const news_and_events = db.news_and_events;
const stream = db.stream;
const countries = db.countries;
const enquiry = db.enquiry;
const college = db.college;
const school = db.school;

const banner = db.banner;
const abroadpages = db.abroadpages;
const Op = db.Sequelize.Op;
const exam = db.exam;
const blog = db.blog;
const courses = db.courses;
const college_stream = db.college_stream;




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
      where: data_array,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id", "exam_title"],
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
      where: data_array,
      attributes: [
        "id",
        "name",
        "slug",
      ],
      // include: [
      //   {
      //     required: false,
      //     association: "abroadpages",
      //     attributes: ["id", "name"],

      //   },
      // ],
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

  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  news_and_events
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "banner_image",
        "meta_title",
        "meta_description",
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
      attributes: ["id", "title", "link", "image"],
      order: [orderconfig],
      limit,
      offset
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
    console.error(err);
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving banners.",
    });
  }
}

exports.allcolleges = async (req, res) => {
  try {
    const { page, size, searchtext, searchfrom, columnname, orderby, country_id, state_id, city_id, type, home_view_status, college_type } = req.query;

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

    let conditionCountryId = country_id ? { country_id: country_id } : null;
    conditionCountryId ? data_array.push(conditionCountryId) : null;

    let conditionStateId = state_id ? { state_id: state_id } : null;
    conditionStateId ? data_array.push(conditionStateId) : null;

    let conditionCityId = city_id ? { city_id: city_id } : null;
    conditionCityId ? data_array.push(conditionCityId) : null;

    if (type) {
      conditionarray.push({ type: type });
    }
    if (home_view_status) {
      conditionarray.push({ home_view_status: home_view_status });
    }
    if (college_type) {
      conditionarray.push({ college_type: college_type });
    }
    const condition = sendsearch.customseacrh(searchtext, searchfrom);
    if (condition) {
      data_array.push(condition);
    }

    const { limit, offset } = getPagination(page, size);
    const data = await college.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray)
      },
      attributes: ["id", "name", "slug", "logo", "banner_image", "address"],
      order: [orderconfig],
      limit,
      offset
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
    console.error(err);
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving colleges.",
    });
  }
}

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
      attributes: ["id", "meta_title", "meta_description"],
      order: [orderconfig],
      limit,
      offset
    });

    const newsPromise = news_and_events.findAndCountAll({
      where: data_array,
      attributes: ["id", "meta_title", "meta_description"],
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

  var condition = searchtext && searchfrom ? {[searchfrom]: { [Sequelize.Op.like]: `%${searchtext}%` }} : null;
  if (condition) data_array.push(condition);

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await stream.findAndCountAll({
      where: data_array,
      attributes: ["id", "name"],
      include: [{
        required: false,
        association: "clgstreamm",
        attributes: ["college_id"],
      }],
      order: [orderconfig],
      limit,
      offset
    });

    const response = getPagingData(data, page, limit);

    
    const finaldataWithCollegeCounts = response.finaldata.map(item => {
      const uniqueColleges = new Set(item.clgstreamm.map(clg => clg.college_id));
      return {
        ...item.dataValues,
        uniqueCollegeCount: uniqueColleges.size
      };
    });

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: finaldataWithCollegeCounts,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore colleges."
    });
  }
};









