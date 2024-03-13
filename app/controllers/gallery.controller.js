const db = require("../models");
const path = require("path");
const gallery = db.gallery;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
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
  const { count: totalItems, rows: gallery } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, gallery, totalPages, currentPage };
};

exports.create = async (req, res) => {
  //  const obj = JSON.parse(req.body.mac);
  // var messages = Array.prototype.slice.call(req.body.mac);
  //req.body['mac[]'].length

  try {
    let images = " ";

    if (req.files && req.files.image) {
      let avatar = req.files.image;
      if (avatar.length > 1) {
        var totalimages = new Array();
        _.forEach(avatar, function (value) {
          if (!array_of_allowed_file_types.includes(value.mimetype)) {
            return res.status(400).send({
              message: "Invalid File types",
              errors: {},
              status: 0,
            });
          }

          if (value.size / (1024 * 1024) > allowed_file_size) {
            return res.status(400).send({
              message: "File too large ",
              errors: {},
              status: 0,
            });
          }
        });

        avatar.forEach((element) => {
          let imgname =
            "image" +
            Date.now() +
            Math.floor(Math.random() * 100) +
            path.extname(element.name);
          console.log(imgname);

          let IsUploadss = element.mv("./storage/gallery/" + imgname) ? 1 : 0;

          if (IsUploadss) {
            let newimg = "gallery/" + imgname;
            totalimages.push(newimg);
          }
        });

        console.log(totalimages);
        if (totalimages == " ") {
          return res.status(400).send({
            message: "insert images",
            errors: {},
            status: 0,
          });
        }

        _.forEach(totalimages, function (value) {
          gallery.create({
            course_id: req.body.course_id,

            images: value,
          });
        });

        return res.status(200).send({
          status: 1,
          message: "Data Save Successfully",
        });
      }

      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type",
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

      let image = "image" + Date.now() + path.extname(avatar.name);
      // console.log(image);
      let IsUpload = avatar.mv("./storage/gallery/" + image) ? 1 : 0;
      console.log(avatar.mv("./storage/gallery/" + image));

      if (IsUpload) {
        images = "gallery/" + image;
      }
    }

    if (images == " ") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const galleryDetails = await gallery.create({
        course_id: req.body.course_id,

        images: images,
      });

      return res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: galleryDetails,
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
// exports.create = async (req, res) => {
//     //  const obj = JSON.parse(req.body.mac);
//     // var messages = Array.prototype.slice.call(req.body.mac);
//     //req.body['mac[]'].length

//     try {

//         let images = ' ';

//         if (req.files && req.files.image) {
//             let avatar = req.files.image;
//             if (avatar.length > 1) {

//                 let result = avatar.map(({ mimetype }) => mimetype);
//                 let result2 = avatar.map(({ size }) => size);
//                 let result3 = avatar.map(({ name }) => name);
//                 let result4 = avatar.map(({ mv }) => mv);
//                 var fnc = result4[0];
//                 console.log(fnc);
//                 // var result4 = avatar.map(key => [key]n);
//                 //    const reformattedArray = kvArray.map(({ key, value}) => ({ [key]: value }));

//                 result.forEach(myFunction = (item) => {
//                     let check = item;
//                     if (!array_of_allowed_file_types.includes(check)) {
//                         return res.status(400).send({
//                             message: 'Invalid File type ',
//                             errors: {},
//                             status: 0
//                         });

//                     }
//                 });
//                 result2.forEach(checkfilesize = (item) => {
//                     let size = item;
//                     if ((size / (1024 * 1024)) > allowed_file_size) {

//                         return res.status(400).send({
//                             message: 'File too large ',
//                             errors: {},
//                             status: 0
//                         });
//                     }

//                 })

//                 var totalimages = new Array();
//                 result3.forEach(function (item, i) {

//                     totalimages[i] = 'image' + Date.now() + path.extname(item);
//                 });
//                 var check = new Array();

//                 result4.forEach(function (x,y) {
//                     totalimages.forEach(function (item, i) {
//                         y=item;
//                         Is = x('./storage/gallery/' + y) ? 1 : 0;
//                         check[i] = Is;
//                     })

//                 });
//                 console.log(check);
//                 // var check = new Array();
//                 // totalimages.forEach(function (item, i) {

//                 //     result4.forEach(function (x){
//                 //      Is = x('./storage/gallery/' + item) ? 1 : 0;
//                 //     })

//                 //     check[i] = Is;
//                 // });
//                 // console.log(check);

//                 let filename = check.every(function (e) {
//                     return e = 1;
//                 });

//                 if (filename) {

//                     var IsUploads = new Array();

//                     totalimages.forEach(function (item, i) {

//                         IsUploads[i] = 'gallery/' + item;
//                     });
//                 }
//                 else {
//                     return res.status(400).send({
//                         message: 'Choose correct image format',
//                         errors: {},
//                         status: 0,
//                     });

//                 }

//                 _.forEach(IsUploads, function (value) {
//                     gallery.create({
//                         course_id: req.body.course_id,

//                         images: value

//                     });
//                 });

//                 return res.status(200).send({
//                     status: 1,
//                     message: 'Data Save Successfully',

//                 });
//             }

//             if ((avatar.size / (1024 * 1024)) > allowed_file_size) {

//                 return res.status(400).send({
//                     message: 'File too large ',
//                     errors: {},
//                     status: 0
//                 });
//             }

//             let image = 'image' + Date.now() + path.extname(avatar.name);
//             // console.log(image);
//             let IsUpload = avatar.mv('./storage/gallery/' + image) ? 1 : 0;
//             console.log(avatar.mv('./storage/gallery/' + image));

//             if (IsUpload)
//                 images = 'gallery/' + image;

//         }

//         if (images == ' ') {
//             return res.status(400).send({
//                 message: 'insert logo',
//                 errors: {},
//                 status: 0,
//             });
//         }
//         else {

//             const galleryDetails = await gallery.create({
//                 course_id: req.body.course_id,

//                 images: images

//             });

//             return res.status(200).send({
//                 status: 1,
//                 message: 'Data Save Successfully',
//                 data: galleryDetails
//             });
//         }
//     }
//     catch (error) {
//         return res.status(400).send({
//             message: 'Unable to insert data',
//             errors: error,
//             status: 0
//         });
//     }

// }

exports.update = (req, res) => {
  const id = req.body.id;

  try {
    let images = " ";

    if (req.files && req.files.image) {
      let avatar = req.files.image;
      if (avatar.length > 1) {
        var totalimages = new Array();

        avatar.forEach((element) => {
          if (!array_of_allowed_file_types.includes(element.mimetype)) {
            return res.status(400).send({
              message: "Invalid File types ",
              errors: {},
              status: 0,
            });
          }

          if (element.size / (1024 * 1024) > allowed_file_size) {
            return res.status(400).send({
              message: "File too large ",
              errors: {},
              status: 0,
            });
          }

          let imgname =
            "image" + Date.now() + Math.random() + path.extname(element.name);

          let IsUploadss = element.mv("./storage/gallery/" + imgname) ? 1 : 0;

          if (IsUploadss) {
            let newimg = "gallery/" + imgname;
            totalimages.push(newimg);
          }
        });

        // console.log(totalimages);
        if (totalimages == " ") {
          return res.status(400).send({
            message: "insert images",
            errors: {},
            status: 0,
          });
        }

        if (req.body.id) {
          gallery.destroy({
            where: { course_id: req.body.id },
          });

          _.forEach(totalimages, function (value) {
            gallery.create({
              course_id: req.body.id,

              images: value,
            });
          });

          return res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
          });
        }
      }

      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type",
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

      let image = "image" + Date.now() + path.extname(avatar.name);
      // console.log(image);
      let IsUpload = avatar.mv("./storage/gallery/" + image) ? 1 : 0;
      console.log(avatar.mv("./storage/gallery/" + image));

      if (IsUpload) {
        images = "gallery/" + image;
      }

      if (images == " ") {
        return res.status(400).send({
          message: "insert logo",
          errors: {},
          status: 0,
        });
      } else {
        if (req.body.id) {
          gallery.destroy({
            where: { course_id: req.body.id },
          });
        }
        gallery.create({
          course_id: req.body.id,

          images: images,
        });

        return res.status(200).send({
          status: 1,
          message: "Data Save Successfully",
        });
      }
    }
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
  gallery
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "Image deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Image with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete Image with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  gallery
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
          message: `Cannot find banner with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving banner with id=" + id,
      });
    });
};
exports.findAll = async (req, res) => {
  const { page, size, searchText, searchfrom, columnname, orderby, course_id } =
    req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var conditioncourse_id = course_id ? { course_id: course_id } : null;
  var condition = sendsearch.customseacrh(searchText, searchfrom);
  var data_array = [];
  conditioncourse_id ? data_array.push(conditioncourse_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  gallery
    .findAndCountAll({ where: data_array, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.gallery,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving city.",
      });
    });
};
