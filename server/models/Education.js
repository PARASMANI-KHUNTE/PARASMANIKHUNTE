const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    startYear: { type: String },
    endYear: { type: String },
    description: { type: String },
    year: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
