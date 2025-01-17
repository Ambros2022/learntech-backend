const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.role;
const Admin = db.admin;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Accesstoken = db.accesstokens;

exports.signinadmin = (req, res) => {
  Admin.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: admin.id }, config.secret, {
        expiresIn: 100000000000000000000, // 24 hours
      });

      res.status(200).send({
        status: 1,
        message: "success",
        data: {
          id: admin.id,
          isadmin: 1,
          email: admin.email,
          name: admin.name,
          accessToken: token,
        },
      });
      Accesstoken.create({
        name: admin.name,
        token: token,
        expires_at: jwt.decode(token).exp * 1000,
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.checkAccessTokenAdmin = async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    // console.log("accessToken", accessToken);
    if (!accessToken) {
      return res.status(401).json({ error: "Access token not provided" });
    }
    const tokenDoc = await Accesstoken.findOne({ where: { token: accessToken, status: 'active' } });

    if (!tokenDoc) {
      return res.status(401).json({ error: "Invalid access token" });
    }
    const currentTime = new Date().getTime();
    const tokenExpireTime = tokenDoc.expires_at;

    if (currentTime > tokenExpireTime) {
      return res.status(401).json({ error: "Access token has expired" });
    }
    return res.status(200).json({
      status: 1,
      message: "Authorized",

    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Authentication failed: " + error.message });
  }
};
exports.adminchangepassword = async (req, res) => {
  await Admin.findByPk(req.userId)
    .then(async (admin) => {
      if (admin) {
        await Admin.update(
          {
            password: bcrypt.hashSync(req.body.password, 8),
          },
          {
            where: {
              id: req.userId,
            },
          }
        );

        res.status(200).send({
          status: 1,
          message: "Password Changed successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find Admin with id=${req.userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Unable to save data",
      });
    });
};



exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
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

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          status: 1,
          message: "success",
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            isadmin: 1,
            accessToken: token,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};


