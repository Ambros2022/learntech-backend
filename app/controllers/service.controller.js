const db = require("../models");
const service = db.service;


exports.createorupdate = async (req, res) => {
  try {
    const obj = await service.findOne({
      where: { id: 1 },
    });

    if (obj) {
      service.update(
        {
          meta_title: req.body.meta_title,
          meta_description: req.body.meta_description,
          meta_keyword: req.body.meta_keyword,
          what_we_are_doing: req.body.what_we_are_doing,
          recognition_and_approvals: req.body.recognition_and_approvals,
          career_planning: req.body.career_planning,
          fees_back_offers: req.body.fees_back_offers,
          free_counseling: req.body.free_counseling,
        },
        {
          where: { id: 1 },
        }
      );

        return res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
      });
    }

    const serviceDetails = await service.create({
          id: 1,
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          what_we_are_doing: req.body.what_we_are_doing ? req.body.what_we_are_doing : null,
          recognition_and_approvals: req.body.recognition_and_approvals ? req.body.recognition_and_approvals : null,
          career_planning: req.body.career_planning ? req.body.career_planning : null,
          fees_back_offers: req.body.fees_back_offers ? req.body.fees_back_offers : null,
          free_counseling: req.body.free_counseling ? req.body.free_counseling : null,
    });

      res.status(200).send({
      status: 1,
      message: "Data created Successfully",
      data: serviceDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.findOne = (req, res) => {
  const id = 1;
  service.findByPk(id)
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
          message: `Cannot find service with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving service with id=" + id

      });
    });
};
