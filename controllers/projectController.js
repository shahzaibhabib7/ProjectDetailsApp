const Project = require('./../models/projectModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');



exports.getAllProjects = catchAsync(async (req, res, next) => {

    const projects = await Project.find();

    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    });
});

exports.getProject = catchAsync(async (req, res, next) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new appError('No project found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            project
        }
    });
});

exports.createProject = catchAsync(async (req, res, next) => {

    const newProject = await Project.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            project: newProject
        }
    });
});

exports.updateProject = catchAsync(async (req, res, next) => {

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
});

exports.deleteProject = catchAsync(async (req, res, next) => {

    await Project.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});