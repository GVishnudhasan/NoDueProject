const mongoose = require('mongoose');

const RequestSchema = mongoose.model("Requests",
    new mongoose.Schema({
        // studentId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Student',
        //     required: true,
        // },
        // courseId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Course',
        //     required: true,
        // },
        studentId: String,
        courseId: String,
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    })
);

module.exports = RequestSchema;