const db = require("../models");
const path = require('path');
const courses = db.courses;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
const job = db.job;




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: job } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, job, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {
       const id=req.body.course_id;
            if (req.body.job1 && id) {

                const job1 = JSON.parse(req.body.job1);
          
                _.forEach(job1, function (value) {
                    job.create({
                        course_id:id,
                        job_profile:value.job_profile,
                        job_description:value.job_description,
                        average_salary:value.average_salary,
                  });
          
          
                });
          
          
          
              }


            res.status(200).send({
                status: 1,
                message: 'Data Save Successfully',
                data: job
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

          if (req.body.job1 && id) {
           job.destroy({
                where: {id:id}
              })
            const job1= JSON.parse(req.body.job1);
            _.forEach(job1, function (value) {
                job.create({
                    course_id:id,
                    job_profile:value.job_profile,
                    job_description:value.job_description,
                    average_salary:value.average_salary,
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
    
    var condition = sendsearch.customseacrh(searchtext,searchfrom);
    const { limit, offset } = getPagination(page, size);
    job.findAndCountAll({ where: condition, limit, offset,order:[orderconfig]  }) 
        .then(data => {
            const response = getPagingData(data, page, limit);




            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.job,
            });




        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving job analysis."
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
   job.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'job deleted successfully',

                });


            } else {

                res.status(400).send({
                    status: 0,
                    message: `job with id=${id}  was not found!`

                });


            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete job with id=" + id

            });

        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
   job.findByPk(id)
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
                    message: `Cannot find job with id=${id}.`

                });


            }
        })
        .catch(err => {


            res.status(500).send({
                status: 0,
                message: "Error retrieving job with id=" + id

            });
        });
};
