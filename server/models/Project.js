const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tech: {
        type: String, // Comma separated or array, keeping string for simplicity based on current frontend
        required: true,
    },
    link: {
        type: String,
    },
    github: {
        type: String,
    },
    year: {
        type: String,
    },
    image: {
        type: String, // Cloudinary URL
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
