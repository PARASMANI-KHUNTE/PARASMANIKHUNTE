const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const sendMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
        name,
        email,
        subject,
        message,
    });

    // Send Email Notification (Optional, if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Message: ${subject}`,
            text: `From: ${name} (${email})\n\n${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
});

const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (message) {
        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

module.exports = { sendMessage, getMessages, deleteMessage };
