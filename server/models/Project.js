const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: String }, // Comma separated string or array? Keeping string for simplicity as per existing frontend
    link: { type: String },
    github: { type: String },
    year: { type: String },
    image: { type: String } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
