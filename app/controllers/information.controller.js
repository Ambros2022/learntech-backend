const db = require("../models");
const information = db.information;


exports.createorupdate = async (req, res) => {
  try {
    const obj = await information.findOne({
      where: { id: 1 },
    });

    if (obj) {
      information.update(
        {
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          code_before_head: req.body.code_before_head ? req.body.code_before_head : null,
          code_before_body: req.body.code_before_body ? req.body.code_before_body : null,
          overview: req.body.overview ? req.body.overview : null,
          entrance_examination: req.body.entrance_examination ? req.body.entrance_examination : null,
          scholarships: req.body.scholarships ? req.body.scholarships : null,
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

    const informationDetails = await information.create({
          id: 1,
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          code_before_head: req.body.code_before_head ? req.body.code_before_head : null,
          code_before_body: req.body.code_before_body ? req.body.code_before_body : null,
          overview: req.body.overview ? req.body.overview : null,
          entrance_examination: req.body.entrance_examination ? req.body.entrance_examination : null,
          scholarships: req.body.scholarships ? req.body.scholarships : null,
    });

      res.status(200).send({
      status: 1,
      message: "Data created Successfully",
      data: informationDetails,
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
  information.findByPk(id)
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
          message: `Cannot find information with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving information with id=" + id

      });
    });
};
