const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid data' });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update fields
        Object.assign(project, req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project' });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting project' });
    }
});

module.exports = router;
