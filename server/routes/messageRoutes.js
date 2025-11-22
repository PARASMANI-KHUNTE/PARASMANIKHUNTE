const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getMessages,
    deleteMessage,
} = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(sendMessage)
    .get(protect, admin, getMessages);

router.route('/:id')
    .delete(protect, admin, deleteMessage);

module.exports = router;
