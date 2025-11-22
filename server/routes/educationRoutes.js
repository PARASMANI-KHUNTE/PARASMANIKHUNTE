const express = require('express');
const router = express.Router();
const {
    getEducation,
    createEducation,
    updateEducation,
    deleteEducation,
} = require('../controllers/educationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEducation)
    .post(protect, admin, createEducation);

router.route('/:id')
    .put(protect, admin, updateEducation)
    .delete(protect, admin, deleteEducation);

module.exports = router;
