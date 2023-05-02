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
};