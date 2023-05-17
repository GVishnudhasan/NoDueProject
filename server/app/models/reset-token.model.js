const mongoose = require("mongoose");

const ResetToken = mongoose.model(
    "ResetToken",
    new mongoose.Schema({
        _studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        resettoken: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            expires: 43200
        },
    })
);

module.exports = ResetToken;