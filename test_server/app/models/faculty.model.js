const mongoose = require("mongoose");

const Faculty = mongoose.model(
  "Faculty",
  new mongoose.Schema({
    name: String,
    facultyid: String,
    email: String,
    department: {
      type: String,
      enum: ["CSE", "IT", "ECE", "EEE", "MECH", "BME"],
    },
    designation: {
        type: String,
        enum: ["Associate Professor", "Assistant Professor", "HoD", "Director", "Principal"],
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
