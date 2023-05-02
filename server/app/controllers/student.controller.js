const db = require("../models");

const Student = db.student;

exports.getStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        res.status(200).send(student);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

exports.updateSendRequest = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        student.sendRequest = true;
        await student.save();
        return res.status(200).send({ message: 'Send request flag updated' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};