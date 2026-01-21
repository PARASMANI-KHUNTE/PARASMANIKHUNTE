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

        // Send Email Notification to Admin
        try {
            const sendEmail = require('../utils/sendEmail');

            const messageHtml = `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
                    ${message}
                </blockquote>
            `;

            await sendEmail({
                to: process.env.EMAIL_USER, // Send to the admin/site owner
                subject: `New Contact Message from ${name}`,
                html: messageHtml
            });

        } catch (emailError) {
            console.error("Email send failed:", emailError);
            // We don't want to fail the request if email fails, just log it
        }

        res.status(201).json(contact);
    } catch (error) {
        console.error("Contact create error:", error);
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

// @route   POST /api/contact/reply
// @desc    Reply to a contact message
// @access  Private
router.post('/reply', protect, async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        const sendEmail = require('../utils/sendEmail');

        const replyHtml = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h3>Reply from Portfolio Admin</h3>
                <p>${message}</p>
                <hr />
                <p style="font-size: 12px; color: #777;">You are receiving this email because you contacted us via our website.</p>
            </div>
        `;

        await sendEmail({
            to,
            subject: subject || "Re: Your message",
            html: replyHtml
        });

        res.status(200).json({ message: 'Reply sent successfully' });
    } catch (error) {
        console.error("Reply error:", error);
        res.status(500).json({ message: 'Error sending reply' });
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

// @route   DELETE /api/contact/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
