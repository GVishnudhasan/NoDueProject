const mongoose = require("mongoose");

const Faculty = mongoose.model(
  "Faculty",
  new mongoose.Schema({
    name: String,
    facultyid: String,
    email: String,
    dateOfJoining: Date,
    department: {
      type: String,
      enum: ["CSE", "IT", "ECE", "EEE", "MECH", "BME"],
    },
    designation: {
        type: String,
        enum: ["Assistant Professor", "Associate Professor", "Head of the Department", "Director"],
    },
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = Faculty;
