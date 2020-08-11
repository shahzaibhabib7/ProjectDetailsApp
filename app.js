// core moduldes
const fs = require('fs');
// third party modules
const express = require('express');
// own modules


const app = express();

// data from the body is added to the 'req' object
app.use(express.json());

const projects = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/project-simple.json`));

const getAllProjects = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    });
};

const getProject = (req, res) => {
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

const createProject = (req, res) => {
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

const updateProject = (req, res) => {
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

const deleteProject = (req, res) => {
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

app.route('/api/v1/projects').get(getAllProjects).post(createProject);
app.route('/api/v1/projects/:id').get(getProject).patch(updateProject).delete(deleteProject);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});