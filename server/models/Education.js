const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    type: {
        type: String,
        default: 'formal', // 'formal' or 'certification'
    },
    degree: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    gpa: {
        type: Number,
    },
    description: {
        type: String,
    },
    courses: [{
        type: String,
    }],
    achievements: [{
        type: String,
    }]
}, {
    timestamps: true,
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
