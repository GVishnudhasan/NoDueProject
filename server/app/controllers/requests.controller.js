const db = require('../models');
const Requests = db.requests;

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const request = new Requests({
            studentId: req.body.studentId,
            courseId: req.body.courseId,
        });
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all pending requests
exports.getPendingRequests = async (req, res) => {
    try {
        const requests = await Requests.find({ status: 'pending' })
            .populate('studentId', 'name')
            .populate('courseId', 'handlingFaculty');
        res.status(201).json(requests);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve a request by ID
exports.approveRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.json(request);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject a request by ID
exports.rejectRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.json(request);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
