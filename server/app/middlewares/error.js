const { ErrorHandler } = require("../utils/errorHandler");
exports.ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //wrong id(mongo)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }
  //duplication error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again!!!";
    err = new ErrorHandler(message, 400);
  } //jwt expire rror
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try again!!!";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
