const db = require("../models");
const Admin = db.admin;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// exports.createAdmin = (req, res) => {
//     const admin = new Admin({
//         name: req.body.name,
//         facultyid: req.body.facultyid,
//         email: req.body.email,
//         department: req.body.department,
//         designation: req.body.designation,
//         password: req.body.password,
//     });

//     admin.save((err, admin) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         Role.findOne({ name: "admin" }, (err, role) => {
//             if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//             }

//             admin.roles = [role._id];
//             admin.save((err) => {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                     return;
//                 }

//                 res.send({ message: "Admin was registered successfully!" });
//             });
//         });
//     });
// };

exports.createAdmin = (req, res) => {
    const admin = new Admin({
        name: req.body.name,
        facultyid: req.body.facultyid,
        email: req.body.email,
        department: req.body.department,
        designation: req.body.designation,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    admin.save((err, admin) => {
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

                    admin.roles = roles.map((role) => role._id);
                    admin.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "Admin registered successfully!" });
                    });
                }
            )
        }
    });
};

exports.deleteAdmin = (req, res) => {
    const { id } = req.params;
    Admin.findByIdAndDelete(id, (err, admin) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(admin);
    });
};