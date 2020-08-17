const Project = require('./../models/projectModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');



exports.getProjects = catchAsync(async (req, res, next) => {
    const projects = await Project.find();

    res.status(200).render('projects', {
        title: 'All Projects',
        projects
    });
});

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).render('users', {
        title: 'Users',
        users
    });
});