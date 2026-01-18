const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    startYear: { type: String },
    endYear: { type: String },
    description: { type: String },
    technologies: { type: String },
    years: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
