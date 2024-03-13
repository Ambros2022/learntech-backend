const db = require("../models");
const about = db.abouts;


exports.createorupdate = async (req, res) => {
  try {
    const obj = await about.findOne({
      where: { id: 1 },
    });

    if (obj) {
      about.update(
        {
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          code_before_head: req.body.code_before_head ? req.body.code_before_head : null,
          code_before_body: req.body.code_before_body ? req.body.code_before_body : null,
          who_we_are: req.body.who_we_are ? req.body.who_we_are : null,
          our_mission: req.body.our_mission ? req.body.our_mission : null,
          our_vision: req.body.our_vision ? req.body.our_vision : null,
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

    const aboutDetails = await about.create({
          id: 1,
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          code_before_head: req.body.code_before_head ? req.body.code_before_head : null,
          code_before_body: req.body.code_before_body ? req.body.code_before_body : null,
          who_we_are: req.body.who_we_are ? req.body.who_we_are : null,
          our_mission: req.body.our_mission ? req.body.our_mission : null,
          our_vision: req.body.our_vision ? req.body.our_vision : null,
    });

      res.status(200).send({
      status: 1,
      message: "Data created Successfully",
      data: aboutDetails,
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
  about.findByPk(id)
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
          message: `Cannot find Stream with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving stream with id=" + id

      });
    });
};