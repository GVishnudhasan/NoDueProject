const controller = require("../controllers/courses.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    app.get('/api/courses', controller.getCourses);
    app.post('/api/add-course', controller.addCourse);
};