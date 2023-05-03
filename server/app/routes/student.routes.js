const controller = require("../controllers/student.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/student/:id", controller.getStudent);

    app.put("/api/update-flag/:id", controller.updateSendRequest);
}