const asyncHandler = require('express-async-handler');
const Education = require('../models/Education');

const getEducation = asyncHandler(async (req, res) => {
    const education = await Education.find({});
    res.json(education);
});

const createEducation = asyncHandler(async (req, res) => {
    const { type, degree, institution, year, location, gpa, description, courses, achievements } = req.body;

    const education = new Education({
        type,
        degree,
        institution,
        year,
        location,
        gpa,
        description,
        courses: courses ? courses.split(',') : [],
        achievements: achievements ? achievements.split(',') : [],
    });

    const createdEducation = await education.save();
    res.status(201).json(createdEducation);
});

const updateEducation = asyncHandler(async (req, res) => {
    const education = await Education.findById(req.params.id);

    if (education) {
        education.type = req.body.type || education.type;
        education.degree = req.body.degree || education.degree;
        education.institution = req.body.institution || education.institution;
        education.year = req.body.year || education.year;
        education.location = req.body.location || education.location;
        education.gpa = req.body.gpa || education.gpa;
        education.description = req.body.description || education.description;
        if (req.body.courses) education.courses = req.body.courses.split(',');
        if (req.body.achievements) education.achievements = req.body.achievements.split(',');

        const updatedEducation = await education.save();
        res.json(updatedEducation);
    } else {
        res.status(404);
        throw new Error('Education not found');
    }
});

const deleteEducation = asyncHandler(async (req, res) => {
    const education = await Education.findById(req.params.id);

    if (education) {
        await education.deleteOne();
        res.json({ message: 'Education removed' });
    } else {
        res.status(404);
        throw new Error('Education not found');
    }
});

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
