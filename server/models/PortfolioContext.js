const mongoose = require('mongoose');

const PortfolioContextSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // Personal Information
    fullName: { type: String, default: '' },
    tagline: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },

    // Professional Details
    currentRole: { type: String, default: '' },
    yearsOfExperience: { type: Number, default: 0 },
    specializations: [String],
    industries: [String],

    // Skills & Technologies (structured)
    technicalSkills: {
        languages: [String],
        frameworks: [String],
        tools: [String],
        databases: [String],
        cloudPlatforms: [String]
    },

    // Work Style & Preferences
    workStyle: { type: String, default: '' },
    preferredProjectTypes: [String],
    careerGoals: { type: String, default: '' },

    // Additional Context for AI
    writingTone: {
        type: String,
        enum: ['professional', 'casual', 'technical', 'creative'],
        default: 'professional'
    },
    personalQuirks: { type: String, default: '' },
    customInstructions: { type: String, default: '' },

}, { timestamps: true });

module.exports = mongoose.model('PortfolioContext', PortfolioContextSchema);
