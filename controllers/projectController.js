const fs = require('fs');


const projects = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/project-simple.json`));

exports.getAllProjects = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    });
};

exports.getProject = (req, res) => {
    // console.log(req.params);

    const id = req.params.id * 1;
    const project = projects.find(el => el.id === id);

    if (!project) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            project
        }
    });
};

exports.createProject = (req, res) => {
    const newId = projects[projects.length - 1].id + 1;
    // console.log(newId);

    const newProject = Object.assign({ id: newId }, req.body);
    // console.log(newProject);
    projects.push(newProject);

    fs.writeFile(`${__dirname}/dev-data/data/project-simple.json`, JSON.stringify(projects), err => {
        res.status(201).json({
            status: 'success',
            data: {
                project: newProject
            }
        });
    });
};

exports.updateProject = (req, res) => {
    if (req.params.id * 1 > projects.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: '<Updated project here...>'
        }
    });
};

exports.deleteProject = (req, res) => {
    if (req.params.id * 1 > projects.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    const deletedProject = projects.splice(req.params.id, 1);
    console.log(deletedProject);

    res.status(204).json({
        status: 'success',
        data: null
    });
};