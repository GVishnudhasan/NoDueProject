const mongoose = require("mongoose");

const Admin = mongoose.model(
    "Admin",
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
            enum: ["Assistant Professor", "Associate Professor", "Head of the Department", "Director"],
        },
        password: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = Admin;