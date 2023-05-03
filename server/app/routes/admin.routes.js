const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/admin/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmailforAdmin,
            verifySignUp.checkRolesExisted
        ],
        controller.createAdmin
    );

    app.get("/admin/students", controller.getStudentbyDept);
    app.get("/admin/courses", controller.getCoursesbyDept);
    app.get("/admin/faculties", controller.getFacultybyDept);
    app.delete("/admin/delete-student/:id", controller.deleteStudentById);
    app.delete("/admin/delete-faculty/:id", controller.deleteFacultyById);
    app.delete("/admin/delete-course/:id", controller.deleteCourseById);
};