const express = require('express');
const router = express.Router();
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getProjects)
    .post(protect, admin, upload.single('image'), createProject);

router.route('/:id')
    .put(protect, admin, upload.single('image'), updateProject)
    .delete(protect, admin, deleteProject);

module.exports = router;
