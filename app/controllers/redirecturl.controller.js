const db = require("../models");
const redirecturl = db.redirecturl;
const sendsearch = require("../utility/Customsearch");
const fs = require("fs");

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: redirecturl } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, redirecturl, totalPages, currentPage };
};

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


const updateFile = () => {

  const htaccessContent = makeid(6);

  fs.writeFile("test.htaccess", htaccessContent, (err) => {
    if (err) {
      return res.status(500).send({ error: "Failed to update .htaccess file" });
    }

  });
};



exports.getFile = async (req, res) => {

  let filename = "test.htaccess";
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send({ error: "No data" });
    }
    // console.log('OK: ' + filename);
    // console.log(data)
 
    return res.status(200).send({
      status: 1,
      data: data,
    });
  });

  // fs.writeFile("test.htaccess", htaccessContent, (err) => {
  //   if (err) {
  //     return res.status(500).send({ error: "Failed to update .htaccess file" });
  //   }

  // });
};


// exports.overwite = async (req, res) => {
//   const statuscode = req.body.status_code;
//   const old_url = req.body.old_url;
//   const new_url = "http://example.com" + req.body.new_url;
//   const htaccessContent =
//     " " + "Redirect" + " " + statuscode + " " + old_url + " " + new_url;

//   fs.writeFile("test.htaccess", htaccessContent, (err) => {
//     if (err) {
//       return res.status(500).send({ error: "Failed to update .htaccess file" });
//     }
//     res.send({ message: "Successfully updated .htaccess file" });
//   });
// };

exports.create = async (req, res) => {
  try {
    const redirecturlDetails = await redirecturl.create({
      old_url: req.body.old_url,
      new_url: req.body.new_url,
      status_code: req.body.status_code,
    });

    if (redirecturlDetails) {

      updateFile();
      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: redirecturlDetails,
        message2: "Successfully updated .htaccess file",
      });
      /*  let old_url = redirecturlDetails.old_url;
        let new_url = "http://example.com" + redirecturlDetails.new_url;
        let statuscode = redirecturlDetails.status_code;
  
        const htaccessContent =
          " " + "Redirect" + " " + statuscode + " " + old_url + " " + new_url;
  
         fs.writeFile("test.htaccess", htaccessContent,(err) => {
          if (err) {
            return res
              .status(500)
              .send({ error: "Failed to update .htaccess file" });
          }
     
          // res.send({ message: "Successfully updated .htaccess file" });
        });*/
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
  const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];
  // updateFile();
  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var condition = sendsearch.customseacrh(searchText, searchfrom);

  let sizes = size == '300' ? 1500 : size;

  const { limit, offset } = getPagination(page, sizes);
  redirecturl
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.redirecturl,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving redirecturls.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  redirecturl
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: "redirecturl  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete  redirecturl with id=${id}. Maybe redirecturl was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete redirecturl with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  redirecturl
    .findByPk(id)
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
          message: `Cannot find redirecturl with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving redirecturl with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  try {
    redirecturl.update(
      {
        old_url: req.body.old_url,
        new_url: req.body.new_url,
        status_code: req.body.status_code,
      },
      {
        where: { id: req.body.id },
      }
    );



    updateFile();

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
