const express = require('express');
const router = express.Router();
const PortfolioContext = require('../models/PortfolioContext');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/portfolio-context
// @desc    Get portfolio context for current user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let context = await PortfolioContext.findOne({ userId: req.user._id });

        // Create default if doesn't exist
        if (!context) {
            context = await PortfolioContext.create({
                userId: req.user._id,
                technicalSkills: {
                    languages: [],
                    frameworks: [],
                    tools: [],
                    databases: [],
                    cloudPlatforms: []
                },
                specializations: [],
                industries: [],
                preferredProjectTypes: []
            });
        }

        res.json(context);
    } catch (error) {
        console.error('Error fetching portfolio context:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/portfolio-context
// @desc    Update portfolio context
// @access  Private
router.put('/', protect, async (req, res) => {
    try {
        let context = await PortfolioContext.findOne({ userId: req.user._id });

        if (!context) {
            context = new PortfolioContext({ userId: req.user._id, ...req.body });
        } else {
            // Update all fields
            Object.assign(context, req.body);
        }

        await context.save();
        res.json(context);
    } catch (error) {
        console.error('Error updating portfolio context:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/portfolio-context/reset
// @desc    Reset portfolio context to defaults
// @access  Private
router.post('/reset', protect, async (req, res) => {
    try {
        await PortfolioContext.findOneAndDelete({ userId: req.user._id });

        const newContext = await PortfolioContext.create({
            userId: req.user._id,
            technicalSkills: {
                languages: [],
                frameworks: [],
                tools: [],
                databases: [],
                cloudPlatforms: []
            },
            specializations: [],
            industries: [],
            preferredProjectTypes: []
        });

        res.json(newContext);
    } catch (error) {
        console.error('Error resetting portfolio context:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
