const express = require('express');
const router = express.Router();
const { incrementVisitor, getVisitorCount } = require('../controllers/visitorController');

router.route('/')
    .post(incrementVisitor)
    .get(getVisitorCount);

module.exports = router;
