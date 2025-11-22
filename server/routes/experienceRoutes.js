const express = require('express');
const router = express.Router();
const {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
} = require('../controllers/experienceController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getExperience)
    .post(protect, admin, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]), createExperience);

router.route('/:id')
    .put(protect, admin, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]), updateExperience)
    .delete(protect, admin, deleteExperience);

module.exports = router;
