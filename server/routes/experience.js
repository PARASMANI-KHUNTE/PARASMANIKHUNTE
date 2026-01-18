const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/authMiddleware');

// Get all
router.get('/', async (req, res) => {
    try {
        const experience = await Experience.find().sort({ startYear: -1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create
router.post('/', protect, async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Update
router.put('/:id', protect, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) return res.status(404).json({ message: 'Not found' });
        res.json(experience);
    } catch (error) {
        res.status(400).json({ message: 'Error updating' });
    }
});

// Delete
router.delete('/:id', protect, async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Not found' });
        await experience.deleteOne();
        res.json({ message: 'Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
});

module.exports = router;
