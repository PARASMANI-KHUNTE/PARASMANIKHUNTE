const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    companyUrl: {
        type: String,
    },
    logoUrl: {
        type: String, // Cloudinary URL
    },
    duration: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    skills: [{
        type: String,
    }],
    certificateUrl: {
        type: String,
    }
}, {
    timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
