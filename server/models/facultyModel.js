import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'],
        required: true
    },
    designation: {
        type: String,
        enum: ['Head of the Department', 'Associate Professor', 'Assistant Professor', 'Director'],
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Faculty', facultySchema);