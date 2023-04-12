const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.studentBoard);

  app.get(
    "/api/test/hod",
    [authJwt.verifyToken, authJwt.isHoD],
    controller.hodBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isFaculty],
    controller.facultyBoard
  );
};
