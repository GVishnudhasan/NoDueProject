const db = require('../models');

const Student = db.student;

exports.grantHodSignature = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    student.hodSignature = true;
    await student.save();
    return res.status(200).send({ message: 'HOD signature granted!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};