const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private (Admin only)
router.post('/', protect, upload.single('image'), (req, res) => {
    if (req.file && req.file.path) {
        res.json({ url: req.file.path });
    } else {
        res.status(400).json({ message: 'Image upload failed' });
    }
});

module.exports = router;
