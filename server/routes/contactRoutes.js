const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');

// GET current contact details
router.get('/', getContact);

// UPDATE contact details (expects JSON body)
router.put('/', updateContact);

module.exports = router;
