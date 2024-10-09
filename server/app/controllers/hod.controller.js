const db = require("../models");
const MESSAGES = require("../utils/const");
const Student = db.student;
const { CatchAsyncError } = require("../middlewares/catchAsyncErrors");
exports.grantHodSignature = CatchAsyncError(async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: MESSAGES.STUDENT_NOT_FOUND });
    }
    student.hodSignature = true;
    await student.save();
    return res.status(200).send({ message: MESSAGES.HOD_SIGNATURE_GRANTED });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
