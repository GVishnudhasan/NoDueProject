const db = require("../models");
const nodemailer = require('nodemailer');
const Student = db.student;
const ResetToken = db.reset_token;

exports.ResetPassword = async (req, res) => {
    if (!req.body.email) {
        return res.status(500).json({ message: 'Email is required' });
    }
    const user = await Student.findOne({ email: req.body.email });
    if (!user) {
        return res.status(409).json({ message: 'Email does not exist' });
    }
    const resettoken = new ResetToken({ _studentId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save()
        .then(() => {
            ResetToken.deleteMany({ _studentId: user._id, resettoken: { $ne: resettoken.resettoken } })
                .then(() => {
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        port: 465,
                        auth: {
                            user: 'ksrietcse2021@gmail.com',
                            pass: 'eznscahkroajykpn'
                        }
                    });
                    const mailOptions = {
                        to: user.email,
                        from: 'ksrietcse2021@gmail.com',
                        subject: 'Password Reset Request',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                    transporter.sendMail(mailOptions)
                        .then(() => {
                            res.status(200).json({ message: 'Reset Password successfully.' });
                        })
                        .catch((err) => {
                            res.status(500).send({ msg: err.message });
                        });
                })
                .catch((err) => {
                    res.status(500).send({ msg: err.message });
                });
        })
        .catch((err) => {
            res.status(500).send({ msg: err.message });
        });
};