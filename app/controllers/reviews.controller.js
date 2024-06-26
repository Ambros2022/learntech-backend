const db = require("../models");
const path = require('path');
const reviews = db.reviews;
const college = db.college;
const Op = db.Sequelize.Op;

const sendsearch = require("../utility/Customsearch");

const _ = require('lodash');


const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: reviews } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, reviews, totalPages, currentPage };
};


exports.create = async (req, res) => {
  try {

    const reviewsDetails = await reviews.create({
      name: req.body.name,
      userrating: req.body.userrating,
      user_id: req.body.user_id,
      content: req.body.content,
      is_approved: req.body.is_approved,
      review_type: req.body.review_type,
      college_id: req.body.college_id,
      course_id: req.body.course_id,
      course_type: req.body.course_type,
      school_id: req.body.school_id,
      school_board_id: req.body.school_board_id,
      grade: req.body.grade,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    });

    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
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

exports.findAll = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];


  let condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);

  reviews
    .findAndCountAll({ where: condition, limit, offset,
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
      ],
      order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

     

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.reviews
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving review ."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  reviews.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'reviews  deleted successfully',

        });

      } else {
        res.status(400).send({
          status: 0,
          message: ` delete reviews with id=${id}. Maybe reviews was not found!`
        });
      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete reviews with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  reviews.findByPk(id,)
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
          message: `Cannot find reviews with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving reviews with id=" + id

      });
    });
};


exports.update = (req, res) => {
  const id = req.body.id;

  try {
    reviews.update({
      name: req.body.name,
      userrating: req.body.userrating,
      user_id: req.body.user_id,
      content: req.body.content,
      is_approved: req.body.is_approved,
      review_type: req.body.review_type,
      college_id: req.body.college_id,
      course_id: req.body.course_id,
      course_type: req.body.course_type,
      school_id: req.body.school_id,
      school_board_id: req.body.school_board_id,
      grade: req.body.grade,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    }, {
      where: { id: req.body.id }
    });


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully'
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to update data',
      errors: error,
      status: 0
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

    if (previousIsApproved !== updatedIsApproved) {
      const collegeId = review.college_id;

      const collegeReviews = await reviews.findAll({
        where: { college_id: collegeId, is_approved: true }
      });

      const totalRating = collegeReviews.reduce((acc, curr) => acc + curr.userrating, 0);
      const avgRating = collegeReviews.length ? totalRating / collegeReviews.length : 0;

      await college.update(
        { avg_rating: avgRating },
        { where: { id: collegeId } }
      );
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
