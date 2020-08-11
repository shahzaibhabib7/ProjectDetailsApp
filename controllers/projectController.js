const fs = require('fs');


const projects = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/project-simple.json`));

exports.checkId = (req, res, next, val) => {
    console.log(`Project id is ${val}`);

    if (req.params.id > projects.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

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
    res.status(200).json({
        status: 'success',
        data: {
            tours: '<Updated project here...>'
        }
    });
};

exports.deleteProject = (req, res) => {
    const deletedProject = projects.splice(req.params.id, 1);
    console.log(deletedProject);

    res.status(204).json({
        status: 'success',
        data: null
    });
};