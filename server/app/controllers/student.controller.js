const db = require("../models");
const MESSAGES = require("../utils/const");
const { CatchAsyncError } = require("../middlewares/catchAsyncErrors");
const Student = db.student;

exports.getStudent = CatchAsyncError(async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    res.status(200).send(student);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

exports.updateSendRequest = CatchAsyncError(async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: MESSAGES.STUDENT_NOT_FOUND });
    }
    student.sendRequest = true;
    await student.save();
    return res.status(200).send({ message: MESSAGES.SEND_REQUEST });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
