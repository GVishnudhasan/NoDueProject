const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/student-signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailforStudent,
      verifySignUp.checkRolesExisted
    ],
    controller.studentSignup
  );
  
  app.post(
    "/api/auth/faculty-signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailforFaculty,
      verifySignUp.checkRolesExisted
    ],
    controller.facultySignup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);
};
