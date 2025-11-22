const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

const getExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.find({});
    res.json(experience);
});

const createExperience = asyncHandler(async (req, res) => {
    const { role, company, companyUrl, duration, location, description, skills } = req.body;
    const logoUrl = req.files['logo'] ? req.files['logo'][0].path : '';
    const certificateUrl = req.files['certificate'] ? req.files['certificate'][0].path : '';

    const experience = new Experience({
        role,
        company,
        companyUrl,
        logoUrl,
        duration,
        location,
        description,
        skills: skills ? skills.split(',') : [],
        certificateUrl,
    });

    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
});

const updateExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
        experience.role = req.body.role || experience.role;
        experience.company = req.body.company || experience.company;
        experience.companyUrl = req.body.companyUrl || experience.companyUrl;
        experience.duration = req.body.duration || experience.duration;
        experience.location = req.body.location || experience.location;
        experience.description = req.body.description || experience.description;
        if (req.body.skills) {
            experience.skills = req.body.skills.split(',');
        }
        if (req.files['logo']) {
            experience.logoUrl = req.files['logo'][0].path;
        }
        if (req.files['certificate']) {
            experience.certificateUrl = req.files['certificate'][0].path;
        }

        const updatedExperience = await experience.save();
        res.json(updatedExperience);
    } else {
        res.status(404);
        throw new Error('Experience not found');
    }
});

const deleteExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
        await experience.deleteOne();
        res.json({ message: 'Experience removed' });
    } else {
        res.status(404);
        throw new Error('Experience not found');
    }
});

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
