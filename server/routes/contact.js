const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.create({ name, email, message });
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Error sending message' });
    }
});

// @route   GET /api/contact
// @desc    Get all messages (for Admin)
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PATCH /api/contact/:id
// @desc    Mark message as read
// @access  Private
router.patch('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        contact.read = true;
        await contact.save();
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Error updating message' });
    }
});

module.exports = router;
