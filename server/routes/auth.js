const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/register
// @desc    Register Admin (One time use mostly)
// @access  Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await argon2.hash(password);

        const user = await User.create({
            username,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await argon2.verify(user.password, password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/auth/update-credentials
// @desc    Update admin username/password
// @access  Private
router.put('/update-credentials', async (req, res) => {
    const { currentPassword, username, password } = req.body;

    try {
        // Get authorization token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token and get user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isPasswordValid = await argon2.verify(user.password, currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update username if provided
        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }
            user.username = username;
        }

        // Update password if provided
        if (password) {
            user.password = await argon2.hash(password);
        }

        await user.save();

        res.json({
            message: 'Credentials updated successfully',
            username: user.username
        });
    } catch (error) {
        console.error('Update credentials error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
