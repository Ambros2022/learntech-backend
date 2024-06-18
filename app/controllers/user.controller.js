const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.role;
const Admin = db.admin;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var sendemails = require("../config/email.config");
const ResetToken = db.resettokens;
const sendsearch = require("../utility/Customsearch");
const nodemailer = require('nodemailer');
require('dotenv').config();

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
  console.log(req.body);


  // return
  try {
    User.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: bcrypt.hashSync(req.body.password, 8),
    }).then((data) => {

      // sendemails.Regesteredmail(req.body.email);
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
            message: "Thankyou, Your account has been sucessfully created.",
            data: {

              id: user.id,
              email: user.email,
              name: user.name,
              isadmin: 0,
              accessToken: token,

            },
          });
        })

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
    const { provider_id, provider_name, email, name } = req.body;

    if (!provider_id || !provider_name) {
      return res.status(400).send({
        status: 0,
        message: "User ID and provider name are required.",
      });
    }

    let user = await User.findOne({
      where: {
        provider_id: provider_id,
        provider_name: provider_name
      }
    });

    if (user) {
      const token = jwt.sign({ id: user.id }, config.secret, {
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
    }

    let userEmail = email || `${provider_id}@${provider_name}.com`;

    if (email) {
      const existingUser = await User.findOne({
        where: { email }
      });
      if (existingUser) {
        userEmail = `${provider_id}@${provider_name}.com`;
      }
    }

    const newUser = await User.create({
      provider_id: provider_id,
      name,
      provider_name: provider_name,
      email: userEmail
    });

    const newToken = jwt.sign({ id: newUser.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    if (newUser.email) {
      sendemails.Regesteredmail(newUser.email);
    }

    return res.status(200).send({
      status: 1,
      message: "Thank you, Your account has been successfully created.",
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isadmin: 0,
        accessToken: newToken,
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to verify token",
      errors: error.message,
      status: 0,
    });
  }
};



exports.signin = (req, res) => {
  // console.log(req.body);
  // return
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
        message: "Your are successfully Login.",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
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



// Assuming you have the sendemails module which contains forgotpasswordmail function

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

      // // Nodemailer configuration
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: process.env.EMAIL_USER, // Your Gmail email address
      //     pass: process.env.EMAIL_PASS, // Your Gmail password
      //   },
      // });

      // // Email options
      // const mailOptions = {
      //   from: process.env.EMAIL_USER, // Sender's email address
      //   to: req.body.email, // Recipient's email address
      //   subject: 'Password Reset OTP', // Email subject
      //   text: `Your OTP for password reset is: ${Otp}`, // Email body
      // };

      // // Sending email
      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });

      return res.status(200).send({
        status: 1,
        message: "Reset otp sent to your email.",
        data: {
          id: user.id,
          email: user.email,
          // Otp: Otp,
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
        message: "OTP did not matched. Please try password reset again.",
        status: 0,
      });
    }

    var fromdate = r.created_at;


    var minutesToAdd = 10;
    var currentDate = new Date();
    var finaltime = new Date(fromdate.getTime() + minutesToAdd * 60000);
    if (currentDate > finaltime) {

      return res.status(400).send({
        message: "OTP  time has expired. Please try password reset again.",
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
        message: "OTP has expired. Please try password reset again.",
        // errors: error,
        status: 0,
      });
    }

    return res.status(200).send({
      status: 1,
      message: "OTP has been verifyed.",

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
  const { email, password, token } = req.body;

  try {
    // Find the reset token record
    const record = await ResetToken.findOne({
      where: {
        email: email,
        token: token,
        used: 0
      }
    });

    // If the token is not found or already used
    if (!record) {
      return res.json({ status: 'error', message: 'Token not found or already used. Please try the reset password process again.' });
    }

    // Mark the token as used
    await ResetToken.update(
      { used: 1 },
      { where: { email: email } }
    );

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Update the user's password
    await User.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    return res.json({ status: 1, message: 'Password reset. Please login with your new password.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ status: 'error', message: 'An error occurred while resetting the password. Please try again later.' });
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
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

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
        if (data.status == 1) {
          await User.update(
            { status: 0 }, { where: { id: id } }
          );
          res.status(200).send({
            status: 1,
            message: 'User Blocked successfully',
          });

        } else {
          await User.update(
            { status: 1 }, { where: { id: id } }
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