const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
const db = require("../models");
const Student = db.student;
const Faculty = db.faculty;
const Admin = db.admin;
const Role = db.role;

const dotenv = require('dotenv');
const MESSAGES = require("../utils/const");
dotenv.config({ path: '../../.env' });

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: MESSAGES.NO_TOKEN_PROVIDED });
  }

  jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: MESSAGES.UNAUTHORIZED });
    }
    req.userId = decoded.id;
    next();
  });
};

isFaculty = (req, res, next) => {
  Faculty.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "faculty") {
            next();
            return;
          }
        }

        res.status(403).send({ message: MESSAGES.REQUIRE_FACULTY_ROLE });
        return;
      }
    );
  });
};

isHoD = (req, res, next) => {
  Faculty.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "hod") {
            next();
            return;
          }
        }

        res.status(403).send({ message: MESSAGES.REQUIRE_HOD_ROLE });
        return;
      }
    );
  });
};

isAdmin = (req, res, next) => {
  Admin.findById(req.facultyid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: MESSAGES.REQUIRE_ADMIN_ROLE });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isFaculty,
  isHoD,
  isAdmin,
};
module.exports = authJwt;
