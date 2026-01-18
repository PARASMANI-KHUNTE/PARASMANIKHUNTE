const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { protect } = require('../middleware/authMiddleware');

// Get all
router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ startYear: -1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create
router.post('/', protect, async (req, res) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json(education);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Update
router.put('/:id', protect, async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!education) return res.status(404).json({ message: 'Not found' });
        res.json(education);
    } catch (error) {
        res.status(400).json({ message: 'Error updating' });
    }
});

// Delete
router.delete('/:id', protect, async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Not found' });
        await education.deleteOne();
        res.json({ message: 'Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
});

module.exports = router;
