require("dotenv").config();
const db = require("../../models");
const sendsearch = require("../../utility/Customsearch");
const state = db.state;


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
          "Some error occurred while retrieving abroadcountries.",
      });
    });
};


