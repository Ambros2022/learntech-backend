const db = require("../models");
const nri = db.nri;


exports.createorupdate = async (req, res) => {
  try {
    const obj = await nri.findOne({
      where: { id: 1 },
    });

    if (obj) {
      nri.update(
        {
          meta_title: req.body.meta_title ? req.body.meta_title : null,
          meta_description: req.body.meta_description ? req.body.meta_description : null,
          meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
          editor: req.body.editor ? req.body.editor : null,
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

    const nriDetails = await nri.create({
        id: 1,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_description: req.body.meta_description ? req.body.description : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
      editor: req.body.editor ? req.body.editor : null,
    });

      res.status(200).send({
      status: 1,
      message: "Data created Successfully",
      data: nriDetails,
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
  nri.findByPk(id)
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
          message: `Cannot find nri with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving nri with id=" + id

      });
    });
};
