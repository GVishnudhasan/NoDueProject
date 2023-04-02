import Student from '../models/studentModel.js';
import { sendToken } from '../utils/jwtToken.js';
import ErrorHandler from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Register a student

export const registerStudent = async (req, res) => {
    const { name, email, password, department, year, semester } = req.body;
    const student = await Student.create({
        name,
        email,
        password,
        department,
        year,
        semester,
    });

    sendToken(student, 201, res);
};

// Login a student

export const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Finding student in database
    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(404).json({ error: 'Invalid Credentials' });
    }

    // Check if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, student.password);
    if (!isPasswordMatched) {
        return res.status(404).json({ error: 'Invalid Credentials' });
    }

    sendToken(student, 200, res);
};

// Logout student

export const logoutStudent = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
}