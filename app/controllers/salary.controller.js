const db = require("../models");
const path = require('path');
const courses = db.courses;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
const salary_trends = db.salary;




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: salary_trends} = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems,salary_trends, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {
       const id=req.body.course_id;
            if (req.body.salary && id) {

                const salary = JSON.parse(req.body.salary);
          
                _.forEach(salary, function (value) {
                    salary_trends.create({
                        course_id:id,
                        salary_year:value.salary_year,
                        amount:value.amount,
                  });
          
          
                });
          
          
          
              }


            res.status(200).send({
                status: 1,
                message: 'Data Save Successfully',
                data: salary_trends
            });
        }
    
    catch (error) {
        return res.status(400).send({
            message: 'Unable to insert data',
            errors: error,
            status: 0
        });
    }


}




exports.update = (req, res) => {



    try {

        const id=req.body.course_id;

          if (req.body.salary && id) {
           salary_trends.destroy({
                where: {id:id}
              })
            const salary = JSON.parse(req.body.salary);
      
            _.forEach(salary, function (value) {
                salary_trends.create({
                    course_id:id,
                    salary_year:value.salary_year,
                    amount:value.amount,
              });
      
      
            });
      
      
      
          }

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



exports.findAll = async (req, res) => {



    const { page, size, searchtext,searchfrom, columnname, orderby } = req.query;

    var column = columnname ? columnname : 'id';
    var order = orderby ? orderby : 'ASC';
    var orderconfig = [column, order];


    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }
    

    var condition = sendsearch.customseacrh(searchtext, searchfrom);

    const { limit, offset } = getPagination(page, size);
    salary_trends.findAndCountAll({ where: condition, limit, offset,order:[orderconfig]  }) 
        .then(data => {
            const response = getPagingData(data, page, limit);




            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.salary_trends,
            });




        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving city."
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    salary_trends.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: '  salary_trend deleted successfully',

                });


            } else {

                res.status(400).send({
                    status: 0,
                    message: `  salary_trendswith id=${id}  was not found!`

                });


            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete   salary_trend with id=" + id

            });

        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    salary_trends.findByPk(id)
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
                    message: `Cannot find   salary_trend with id=${id}.`

                });


            }
        })
        .catch(err => {


            res.status(500).send({
                status: 0,
                message: "Error retrieving   salary_trend with id=" + id

            });
        });
};
