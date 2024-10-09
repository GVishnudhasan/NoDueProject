// const config = require("../config/auth.config");
const dotenv = require("dotenv");
const db = require("../models");
const MESSAGES = require("../utils/const");
const Student = db.student;
const Faculty = db.faculty;
const Role = db.role;
const Admin = db.admin;
const { ErrorHandler } = require("../utils/errorHandler");
const { CatchAsyncError } = require("../middlewares/catchAsyncErrors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
dotenv.config({ path: "../../.env" });
// dotenv.config();
// console.log(process.env.AUTH_KEY);

exports.studentSignup = (req, res, next) => {
  const user = new Student({
    name: req.body.name,
    regno: req.body.regno,
    email: req.body.email,
    department: req.body.department,
    year: req.body.year,
    semester: req.body.semester,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  // console.log(user);

  user.save((err, user) => {
    if (err) {
      next(new ErrorHandler(err.message, 500));
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: MESSAGES.USER_REGISTERED_SUCCESSFULLY });
          });
        }
      );
    } else {
      Role.findOne({ name: "student" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: MESSAGES.USER_REGISTERED_SUCCESSFULLY });
        });
      });
    }
  });
};

exports.facultySignup = (req, res) => {
  const user = new Faculty({
    name: req.body.name,
    facultyid: req.body.facultyid,
    email: req.body.email,
    dateOfJoining: req.body.dateOfJoining,
    department: req.body.department,
    designation: req.body.designation,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  console.log(user);

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: MESSAGES.USER_REGISTERED_SUCCESSFULLY });
          });
        }
      );
    } else {
      Role.findOne({ name: "faculty" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: MESSAGES.FACULTY_REGISTERED_SUCCESSFULLY });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  Student.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, student) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (student) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          student.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ message: MESSAGES.INVALID_PASSWORD });
        }

        var token = jwt.sign({ id: student.id }, process.env.AUTH_KEY, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];
        for (let i = 0; i < student.roles.length; i++) {
          authorities.push("ROLE_" + student.roles[i].name.toUpperCase());
        }

        req.session.token = token;

        return res.status(200).send({
          id: student._id,
          name: student.name,
          regno: student.regno,
          email: student.email,
          department: student.department,
          year: student.year,
          semester: student.semester,
          roles: authorities,
        });
      } else {
        Faculty.findOne({
          email: req.body.email,
        })
          .populate("roles", "-__v")
          .exec((err, faculty) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (faculty) {
              var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                faculty.password
              );

              if (!passwordIsValid) {
                return res
                  .status(401)
                  .send({ message: MESSAGES.INVALID_PASSWORD });
              }

              var token = jwt.sign({ id: faculty.id }, process.env.AUTH_KEY, {
                expiresIn: 86400, // 24 hours
              });

              var authorities = [];
              for (let i = 0; i < faculty.roles.length; i++) {
                authorities.push("ROLE_" + faculty.roles[i].name.toUpperCase());
              }

              req.session.token = token;

              return res.status(200).send({
                id: faculty._id,
                name: faculty.name,
                facultyid: faculty.facultyid,
                email: faculty.email,
                department: faculty.department,
                dateOfJoining: faculty.dateOfJoining,
                designation: faculty.designation,
                roles: authorities,
              });
            } else {
              Admin.findOne({
                email: req.body.email,
              })
                .populate("roles", "-__v")
                .exec((err, admin) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  if (admin) {
                    var passwordIsValid = bcrypt.compareSync(
                      req.body.password,
                      admin.password
                    );

                    if (!passwordIsValid) {
                      return res
                        .status(401)
                        .send({ message: MESSAGES.INVALID_PASSWORD });
                    }

                    var token = jwt.sign(
                      { id: admin.id },
                      process.env.AUTH_KEY,
                      {
                        expiresIn: 86400, // 24 hours
                      }
                    );

                    var authorities = [];
                    for (let i = 0; i < admin.roles.length; i++) {
                      authorities.push(
                        "ROLE_" + admin.roles[i].name.toUpperCase()
                      );
                    }

                    req.session.token = token;

                    return res.status(200).send({
                      id: admin._id,
                      name: admin.name,
                      facultyid: admin.facultyid,
                      email: admin.email,
                      department: admin.department,
                      designation: admin.designation,
                      roles: authorities,
                    });
                  } else {
                    return res
                      .status(404)
                      .send({ message: MESSAGES.USER_NOT_FOUND });
                  }
                });
            }
          });
      }
    });
};

exports.signout = CatchAsyncError(async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: MESSAGES.USER_LOGGED_OUT });
  } catch (err) {
    this.next(err);
  }
});
