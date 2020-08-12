const Project = require('./../models/projectModel');



exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: {
                projects
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                project
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createProject = async (req, res) => {
    try {
        const newProject = await Project.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                project: newProject
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
            // the 'new' updated document is the one that will be returned
            new: true,
            // so that each time that we update a certain document then the validators that
            // we specified in the schema will run again.
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                updatedProject
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);

        res.status(404).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};