const db = require("../models");
const review = db.review;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
const CollegeAndUniversity = db.CollegeAndUniversity;
const school = db.school;
const Op = db.Sequelize.Op;
// Array of allowed files

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: review } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, review, totalPages, currentPage };
};

exports.create = async (req, res) => {


let type=req.body.type;
let slug='';

if(type=='school')
{

  await school.findOne({
    where: {
      id: req.body.item_id},
  }).then((data) => {
    if (data) {
      slug=data.school_slug;
    } else {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving school ",
      });
    }
  }) .catch((err) => {
    res.status(500).send({
      status: 0,
      message: err.message || "Error retrieving school with ",
    });
  });

}
else
{

  await CollegeAndUniversity.findOne({
    where: {
      id: req.body.item_id},
  }).then((data) => {
    if (data) {
      slug=data.slug;
    } else {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving college" ,
      });
    }
  }) .catch((err) => {
    res.status(500).send({
      status: 0,
      message: err.message || "Error retrieving college",
    });
  });
}


  try {
    const reviewDetails = await review.create({
      userrating: req.body.userrating,
      content: req.body.content,
      user_id: req.body.user_id,
      item_id: req.body.item_id,
      type: req.body.type,
      is_approved: req.body.is_approved,
      slug:slug,
      name: req.body.name ? req.body.name : null,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: reviewDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = (req, res) => {
  const id = req.body.id;
  try {
    review.update(
      {
        // userrating: req.body.userrating,
        content: req.body.content,
        // user_id: req.body.user_id,
        // item_id: req.body.item_id,
        // type: req.body.type,
        // is_approved: req.body.is_approved,
        // name: req.body.name ? req.body.name : null,
      },
      {
        where: { id },
      }
    );

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
    user_id,
    item_id,
    type,
    status,
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

  var conditionuser_id = user_id ? { user_id: user_id } : null;
  var conditionitem_id = item_id ? { item_id: item_id } : null;
  var conditiontype = type
    ? {
        [Op.or]: [
          {
            type: {
              [Op.like]: `%${type}%`,
            },
          },
        ],
      }
    : null;
  var conditionstatus = status
    ? {
        [Op.or]: [
          {
            is_approved: {
              [Op.like]: `%${status}%`,
            },
          },
        ],
      }
    : null;
    

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditionuser_id ? data_array.push(conditionuser_id) : null;
  conditionitem_id ? data_array.push(conditionitem_id) : null;
  condition ? data_array.push(condition) : null;
  conditiontype ? data_array.push(conditiontype) : null;
  conditionstatus ? data_array.push(conditionstatus) : null;

  const { limit, offset } = getPagination(page, size);
  review
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        { association: "users", attributes: ["id", "name"] },
        {
          association: "CollegeAndUniversity",
          attributes: ["id", "name", "slug"],
        },
        {
          association: "maincourse",
          attributes: ["id"],
          include: [
            {
              association: "course",
              attributes: ["course_stream_slug"],
            },
          ],
        },{
            association: "reviewstream",
            attributes: ["id","stream_slug"],
          },
      ],
      order: [orderconfig],
    })
    .then((data) => {
      // console.log(data.rows);
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.review,
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
  review
    .findByPk(id, {
      include: [
        { association: "users", attributes: ["id", "name"] },
        { association: "CollegeAndUniversity", attributes: ["id", "name"] },
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
          message: `Cannot find review with id=${id}.`,
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
  review
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "review  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete review with id=${id}. Maybe review was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete review with id=" + id,
      });
    });
};

exports.changestatus = async (req, res) => {
  var ids = req.body.ids;

  ids = JSON.parse(ids);
  var status = req.body.is_approved;
  if (status === "0") {
    status = "1";
  } else {
    status = "0";
  }
 itemid=0;
 let type='';
  await review
  .findOne({
    where: {
      id: ids,

    }})
  .then((data) => {
    if (data) {
      itemid=data.item_id;
      type=data.type;
    } else {
      res.status(400).send({
        status: 0,
        message: `Cannot find review  with id=${ids}.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      status: 0,
      message: err.message || "Error retrieving review with id=" + ids,
    });
  });






  try {
    if (req.body.ids) {
      var ids = req.body.ids;

      ids = JSON.parse(ids);

      review.update(
        {
          is_approved: status,
        },
        {
          where: {
            id: ids,
          },
        }
      );
    }

   
    let datas= await review.findOne({
      where:{
      item_id: itemid,
       },
       attributes: [
        [db.Sequelize.fn("AVG", db.Sequelize.cast(db.Sequelize.col("userrating"), 'integer')), "userrating"]
        
      ]
      ,
      group: ['item_id']}).then((datanew) => {


        if(type=='school')
        {
           school.update(
            {
              avg_rating: datanew.userrating,
            },
            {
              where: {
                id: itemid,
              }
            }
          );


        
        
        }
        
        
        
        else
        
        {

          CollegeAndUniversity.update(
            {
              avg_rating: datanew.userrating,
            },
            {
              where: {
                id: itemid,
              }
            }
          );


        }
          
          
          /* 
        
        ALTER TABLE `schools`
ADD `avg_rating` float NULL;*/
       // alert(datanew.ratingAvg);
        res.status(200).send({
          status: 1,
          datas:datanew.ratingAvg,
          message: "Data Save Successfully",
        });

      });

    res.status(200).send({
      status: 1,
      datas:datas,
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
