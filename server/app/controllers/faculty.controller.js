const config = require("../config/auth.config");
const db = require("../models");

const Faculty = db.faculty;

exports.getFaculty = async (req, res) => {
    try {
        const facultyId = req.params.id;
        const faculty = await Faculty.findById(facultyId);
        res.status(200).send(faculty);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};