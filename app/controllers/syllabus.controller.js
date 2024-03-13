
//const modes = db.modes 
// Array of allowed files

const db = require("../models");
const path = require('path');
const courses = db.courses;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;

const syllabus = db.syllabus;

const syllabus_details = db.syllabus_details;// Array of allowed files




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: syllabus } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems,syllabus, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {
        const id1 = req.body.course_id;
        const fee = await syllabus.create({
            course_id: id1,
            
            title: req.body.title,

         


        });

        if (req.body.syllabusdetail && syllabus.id) {

            const syllabusdetail = JSON.parse(req.body.syllabusdetail);

            _.forEach(syllabusdetail, function (value) {
                syllabus_details.create({
                    syllabus_id:syllabus.id,
                    subject:value.subject,
                    description:value.description,

                });

            });

            res.status(200).send({
                status: 1,
                message: 'Data Save Successfully',
                data: syllabus_details
            });

        }
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
            const id = req.body.id;
           syllabus.update({
            course_id: id1,
            
            title: req.body.title,



            }, {
                where: { id }
            });
            if (req.body.syllabusdetail && id) {
                syllabus_details.destroy({
                    where: { syllabus_id:id }
                })
                const syllabusdetail = JSON.parse(req.body.syllabusdetail);

                _.forEach(syllabusdetail, function (value) {
                   syllabus_details.create({
                    syllabus_id:syllabus.id,
                    subject:value.	subject,
                    description:value.description,


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



        const { page, size, searchText, medium_id, college_id, columnname, orderby } = req.query;

        var column = columnname ? columnname : 'id';
        var order = orderby ? orderby : 'ASC';
        var orderconfig = [column, order];


        const myArray = column.split(".");
        if (typeof myArray[1] !== "undefined") {
            var table = myArray[0];
            column = myArray[1];
            orderconfig = [table, column, order];
        }



        var condition = searchText ?

            {

                [Op.or]: [
                    {
                        course_id:
                        {
                            [Op.like]: `%${searchText}%`
                        }
                    },
                
                    {
                        title:
                        {
                            [Op.like]: `%${searchText}%`
                        }
                    },


                ]
            } : null;


        const { limit, offset } = getPagination(page, size);
        syllabus.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
            .then(data => {
                const response = getPagingData(data, page, limit);




                res.status(200).send({
                    status: 1,
                    message: "success",
                    totalItems: response.totalItems,
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    data: response.syllabus,
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
       syllabus.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {

                    res.status(200).send({
                        status: 1,
                        message: 'syllabus deleted successfully',

                    });


                } else {

                    res.status(400).send({
                        status: 0,
                        message: `syllabus swith id=${id}  was not found!`

                    });


                }
            })
            .catch(err => {

                res.status(500).send({
                    status: 0,
                    message: "Could not delete syllabus with id=" + id

                });

            });
    };
    exports.findOne = (req, res) => {
        const id = req.params.id;
        syllabus.findByPk(id)
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
                        message: `Cannot find syllabus with id=${id}.`

                    });


                }
            })
            .catch(err => {


                res.status(500).send({
                    status: 0,
                    message: "Error retrieving syllabuswith id=" + id

                });
            });
    };
