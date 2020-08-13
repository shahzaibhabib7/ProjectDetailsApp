const Project = require('./../models/projectModel');
const User = require('./../models/userModel');



exports.getProjects = async (req, res) => {
    const projects = await Project.find();

    res.status(200).render('projects', {
        title: 'All Projects',
        projects
    });
};

exports.getUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).render('users', {
        title: 'Users',
        users
    });
};