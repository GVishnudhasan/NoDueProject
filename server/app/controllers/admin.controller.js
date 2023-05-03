const db = require("../models");
const Admin = db.admin;
const Faculty = db.faculty;
const Student = db.student;
const Courses = db.courses;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createAdmin = (req, res) => {
    const admin = new Admin({
        name: req.body.name,
        facultyid: req.body.facultyid,
        email: req.body.email,
        department: req.body.department,
        designation: req.body.designation,
        password: bcrypt.hashSync(req.body.password, 8)
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

exports.getFacultybyDept = async (req, res) => {
    try {
        const department = req.query.department
        const faculties = await Faculty.find({ department: department });
        res.status(200).send(faculties);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

exports.getStudentbyDept = async (req, res) => {
    try {
        const department = req.query.department;
        const students = await Student.find({ department: department });
        res.status(200).send(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

exports.getCoursesbyDept = async (req, res) => {
    try {
        const department = req.query.department;
        const courses = await Courses.find({ department: department });
        res.status(200).send(courses);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

exports.deleteStudentById = (req, res, next) => {
    const studentId = req.params.id;
    Student.findByIdAndRemove(studentId)
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: err.message });
        });
};

exports.deleteFacultyById = (req, res, next) => {
    const facultyId = req.params.id;
    Faculty.findByIdAndRemove(facultyId)
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: err.message });
        });
};

exports.deleteCourseById = (req, res, next) => {
    const courseId = req.params.id;
    Courses.findByIdAndRemove(courseId)
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: err.message });
        });
};