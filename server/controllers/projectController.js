const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const { title, description, tech, link, github, year } = req.body;
    const image = req.file ? req.file.path : '';

    const project = new Project({
        title,
        description,
        tech,
        link,
        github,
        year,
        image,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, tech, link, github, year } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = title || project.title;
        project.description = description || project.description;
        project.tech = tech || project.tech;
        project.link = link || project.link;
        project.github = github || project.github;
        project.year = year || project.year;
        if (req.file) {
            project.image = req.file.path;
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

module.exports = { getProjects, createProject, updateProject, deleteProject };
