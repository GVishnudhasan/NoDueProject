const db = require("../models");
const ROLES = db.ROLES;
const Student = db.student;
const Faculty = db.faculty;
const Admin = db.admin;

checkDuplicateUsernameOrEmailforStudent = (req, res, next) => {
  // Username
  Student.findOne({
    regno: req.body.regno
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! This Reg No. is already taken!" });
      return;
    }

    // Email
    Student.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! This Email is already taken!" });
        return;
      }

      next();
    });
  });
};

checkDuplicateUsernameOrEmailforAdmin = (req, res, next) => {
  // Username
  Admin.findOne({
    facultyid: req.body.facultyid
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! This Faculty Id is already taken!" });
      return;
    }

    // Email
    Admin.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! This Email is already taken!" });
        return;
      }

      next();
    });
  });
};

checkDuplicateUsernameOrEmailforFaculty = (req, res, next) => {
  // Username
  Faculty.findOne({
    facultyid: req.body.facultyid
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! This Faculty No. is already taken!" });
      return;
    }

    // Email
    Faculty.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! This Email is already taken!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmailforStudent,
  checkDuplicateUsernameOrEmailforFaculty,
  checkDuplicateUsernameOrEmailforAdmin,
  checkRolesExisted
};

module.exports = verifySignUp;
