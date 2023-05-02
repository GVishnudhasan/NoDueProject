const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    regno: String,
    email: String,
    department: {
      type: String,
      enum: ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'],
    },
    year: {
      type: String,
      enum: ["1", "2", "3", "4"],
    },
    semester: {
      type: String,
      enum: ["Odd", "Even"],
    },
    hodSignature: {
      type: Boolean,
      default: false,
    },
    sendRequest: {
      type: Boolean,
      default: false,
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

module.exports = Student;
