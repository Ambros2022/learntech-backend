const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { verifySignUp, globalvalidation } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/user/signup", globalvalidation.userSchema,
    [
      verifySignUp.checkDuplicateMobileOrEmail, globalvalidation.Validate

    ],
    controller.signup
  );
  app.post(
    "/api/auth/user/signup/sociallogin", controller.socialsignup
  );







  app.post("/api/auth/user/signin", controller.signin);
  app.post("/api/auth/user/signout", controller.signout);

  app.post("/api/auth/user/forgotPassword", globalvalidation.userforgotpassword,
    [
      globalvalidation.Validate
    ],
    controller.forgotPassword);


  app.post("/api/auth/user/forgotPassword/tokenverify", globalvalidation.userforgotpassword,
    [
      globalvalidation.Validate
    ],
    controller.tokenverify);

  app.post("/api/auth/user/newPassword", globalvalidation.userforgotpasswordnew,
    [
      globalvalidation.Validate
    ],
    controller.forgotPasswordnew);









  // app.post("/api/auth/user/sendmail", controller.sendmail);


  // app.post(
  //   "/api/auth/signup",
  //   [
  //     verifySignUp.checkDuplicateUsernameOrEmail,
  //     verifySignUp.checkRolesExisted
  //   ],
  //   controller.signup
  // );





  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
