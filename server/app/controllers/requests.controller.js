const db = require("../models");
const MESSAGES = require("../utils/const");
const Requests = db.requests;
const Faculty = db.faculty;
const Courses = db.courses;
const { CatchAsyncError } = require("../middlewares/catchAsyncErrors");
// Create a new request
exports.createRequest = CatchAsyncError(async (req, res) => {
  try {
    const request = new Requests({
      studentId: req.body.studentId,
      courseId: req.body.courseId,
      facultyId: req.body.facultyId,
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});

exports.getPendingRequests = CatchAsyncError(async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.query._id);
    console.log(faculty._id, faculty.name);
    const subjects = await Courses.findOne({
      handlingFacultyName: faculty._id,
    });
    console.log("SUBJECTS:", subjects, subjects._id);

    const requests = await Requests.find({
      status: "pending",
      courseId: subjects._id,
    })
      .populate("studentId", "name regno department year semester")
      .populate("courseId", "handlingFaculty course_name course_code")
      .exec(async (err, requests) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ message: "Server error" });
        } else {
          if (!requests) {
            res.status(404).json({ message: MESSAGES.REQUEST_NOT_FOUND });
          } else {
            res.status(200).json(requests);
          }
        }
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});

exports.getRequestStatus = CatchAsyncError(async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
    const request = await Requests.findOne({ courseId, studentId });
    if (!request) {
      res.status(404).json({ message: MESSAGES.REQUEST_NOT_FOUND });
    } else {
      const data = { status: request.status, remarks: request.remarks };
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});

// Approve a request by ID
exports.approveRequest = CatchAsyncError(async (req, res) => {
  try {
    const request = await Requests.findByIdAndUpdate(
      req.params.id,
      { status: "approved" }
      // { new: true }
    );
    // console.log(request);
    res.json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});

// Reject a request by ID
exports.rejectRequest = CatchAsyncError(async (req, res) => {
  try {
    const request = await Requests.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" }
      // { new: true }
    );
    res.json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});

exports.updateRemarks = CatchAsyncError(async (req, res) => {
  try {
    const msg = req.body.message;
    const request = await Requests.findByIdAndUpdate(
      req.params.id,
      { remarks: msg }
      // { new: true }
    );
    res.json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
});
