const express = require('express');
const router = express.Router();
const { chatWithAI, pingAI } = require('../controllers/aiController');
router.get('/ping', pingAI);

module.exports = router;
