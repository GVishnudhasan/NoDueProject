const controller = require("../controllers/requests.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
    );
    next();
  });

  app.post('/api/request-nodue', controller.createRequest);
  app.get('/api/display-pending', controller.getPendingRequests);
  app.get('/api/:courseId/:studentId', controller.getRequestStatus);
  app.put('/api/approve-request/:id', controller.approveRequest);
  app.put('/api/reject-request/:id', controller.rejectRequest);
  app.put('/api/update-remarks/:id', controller.updateRemarks);
};  