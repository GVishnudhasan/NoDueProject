const mongoose = require('mongoose');

const RequestSchema = mongoose.model("Requests",
    new mongoose.Schema({
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses',
            required: true,
        },
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        remarks: {
            type: String,
        },
    })
);

module.exports = RequestSchema;