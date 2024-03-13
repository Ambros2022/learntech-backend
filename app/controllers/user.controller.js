const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Admin = db.admin;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var sendemails = require("../config/email.config");
const ResetToken = db.resettokens;
const sendsearch = require("../utility/Customsearch");

const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: User } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, User, totalPages, currentPage };
};


exports.signup = (req, res) => {
  try {
    User.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: bcrypt.hashSync(req.body.password, 8),
    }).then((data) => {

      sendemails.Regesteredmail(req.body.email);
      var request = { email: req.body.email };
      User.findOne({
        where: request,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          
    
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
    
        res.status(200).send({
            status: 1,
            message: "User successfully created",
            data: {

              id: user.id,
              email: user.email,
              name: user.name,
              isadmin: 0,
              accessToken: token,

            },
          });
        })


      
///console.log(data);
     /* res.status(200).send({
        status: 1,
        message: "user successfully created",
      });*/


      





    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.socialsignup = async (req, res) => {
  try {

    if (req.body.userId) {
      var request = { provider_id:req.body.userId, provider_name: req.body.providername};
    }
    var userr = await User.findOne({
      where: request
    })
    if ( userr != null) {
      var token = jwt.sign({ id: userr.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      return res.status(200).send({
        status: 1,
        message: "success",
        data: {
          id: userr.id,
          name: userr.name,
          accessToken: token,
        },
      });

    }

let emails=req.body.email;
let nemails=req.body.userId+'@'+req.body.providername+'.com';
    if (req.body.email) {
      var request = { email:req.body.email};


      var userrs = await User.findOne({
        where: request
      })
      if ( userrs != null) {
      
        emails=req.body.userId+'@'+req.body.providername+'.com';
      }

    }
   







    var New = await User.create({

      provider_id: req.body.userId,
      name: req.body.name,
      provider_name: req.body.providername,
      remember_token: req.body.accessTokens,
      email: emails ? emails :nemails


    })

    var token = jwt.sign({ id: New.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
   if (New.email != null) {
    sendemails.Regesteredmail(req.body.email);
   }

    return res.status(200).send({
      status: 1,
      message: "success",
      data: {
        id: New.id,
        name: New.name,
        accessToken: token,
      },
    });
    
  } catch (error) {
    return res.status(400).send({
      message: "Unable to verify  token",
      errors: error.m,
      status: 0,
    });
  }
};



exports.signin = (req, res) => {
  /*if (req.body.email) {
    var request = { email: req.body.email };
  }
  if (req.body.mobile) {
    var request = { mobile: req.body.mobile };
  }*/

  User.findOne({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.eq]: req.body.email,
          },
        },
        {
          mobile: {
            [Op.eq]: req.body.email,
          },
        },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        status: 1,
        message: "success",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          isadmin: 0,
          accessToken: token,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

exports.forgotPassword = async (req, res) => {
  var email = req.body.email;
  try {
    User.findOne({
      where: { email: email },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      function generator() {
        const ran1 = () =>
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].sort((x, z) => {
            ren = Math.random();
            if (ren == 0.5) return 0;
            return ren > 0.5 ? 1 : -1;
          });
        const ran2 = () =>
          ran1().sort((x, z) => {
            ren = Math.random();
            if (ren == 0.5) return 0;
            return ren > 0.5 ? 1 : -1;
          });

        return Array(6)
          .fill(null)
          .map((x) => ran2()[(Math.random() * 9).toFixed()])
          .join("");
      }

      var Otp = generator();

      ResetToken.create({
        email: req.body.email,
        expiration: 10,
        token: Otp,
        user_id: user.id,
        used: 0,
      });

      sendemails.forgotpasswordmail(req.body.email, Otp);

      return res.status(200).send({
        status: 1,
        message: "Reset otp sent to your email.",
        data: {
          id: user.id,
          email: user.email,
          Otp: Otp,
        },
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.tokenverify = async (req, res) => {
  try {
    var email = req.body.email;
    var token = req.body.token;
    let used = 0;
    var r = await ResetToken.findOne({
      where: {
        email, token, used
      }
    })
    if (r == null) {
      return res.status(400).send({
        message: "Token has expired. Please try password reset again.",
        status: 0,
      });
    }

    var fromdate = r.created_at;


    var minutesToAdd = 10;
    var currentDate = new Date();
    var finaltime = new Date(fromdate.getTime() + minutesToAdd * 60000);
    if (currentDate > finaltime) {

      return res.status(400).send({
        message: "Token  time has expired. Please try password reset again.",
        // errors: error,
        status: 0,
      });



    }

    var record = await ResetToken.findOne({
      where: {
        email, token, used,


      },
    });
    // console.log(record);

    if (record == null) {
      return res.status(400).send({
        message: "Token has expired. Please try password reset again.",
        // errors: error,
        status: 0,
      });
    }

    return res.status(200).send({
      status: 1,
      message: "token has been verifyed.",

    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to verify  token",
      errors: error,
      status: 0,
    });
  }







};






exports.forgotPasswordnew = async (req, res) => {
  var email = req.body.email;
  //  var  password = req.body.password;
  var record = await ResetToken.findOne({
    where: {
      email: email,
      token: req.body.token,
      used: 0
    }
  });
  if (record == null) {
    return res.json({ status: 'error', message: 'Token not found. Please try the reset password process again.' });
  }

  var upd = await ResetToken.update({
    used: 1
  },
    {
      where: {
        email: email
      }
    });



  var pss = await User.update({
    password: bcrypt.hashSync(req.body.password, 8),

  },
    {
      where: {
        email: email
      }
    });

  return res.json({ status: 'ok', message: 'Password reset. Please login with your new password.' });











};



exports.findAll = async (req, res) => {

  const { page, size, searchText,searchfrom,columnname, orderby } = req.query;

  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var condition = sendsearch.customseacrh(searchText, searchfrom);

  const { limit, offset } = getPagination(page, size);
  User.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);




      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.User
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving Streams."
      });
    });
};



exports.changestatus = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(async data => {
      if (data) {
        if(data.status == 1){
          await User.update(
            {status:0},{ where: { id:id}}
          );
          res.status(200).send({
            status: 1,
            message: 'User Blocked successfully',
          });

        }else{
          await User.update(
            {status:1},{ where: { id:id}}
          );
          res.status(200).send({
            status: 1,
            message: 'User Active successfully',
          });



        }


        

      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find User with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving User with id=" + id

      });
    });
};