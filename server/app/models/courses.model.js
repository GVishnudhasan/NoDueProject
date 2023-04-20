const mongoose = require('mongoose');

const CourseSchema = mongoose.model("Courses",
    new mongoose.Schema({
        department: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        semester: {
            type: String,
            required: true
        },
        course_name: {
            type: String,
            required: true
        },
        course_code: {
            type: String,
            required: true
        },
        handlingFacultyName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        // handlingFacultyId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Faculty',
        //     required: true,
        // },
    })
);

module.exports = CourseSchema;