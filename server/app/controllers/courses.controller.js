const db = require('../models');
const Courses = db.courses;

exports.getCourses = (req, res, next) => {
    const { department, year, semester } = req.query;
    Courses.find({ department, year, semester })
        .populate('courseId', 'course_name course_code')
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.addCourse = (req, res) => {
    const course = new Courses({
        department: req.body.department,
        year: req.body.year,
        semester: req.body.semester,
        course_name: req.body.course_name,
        course_code: req.body.course_code,
        handlingFacultyName: req.body.faculty,
        // handlingFacultyId: req.body.facultyid,
    });

    course.save((err, course) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(course);
        }
    });
};
