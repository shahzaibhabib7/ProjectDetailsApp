// core moduldes
const fs = require('fs');
// third party modules
const express = require('express');
// own modules


const app = express();

// data from the body is added to the 'req' object
app.use(express.json());

const projects = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/project-simple.json`));

app.get('/api/v1/projects', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    });
});

app.get('/api/v1/projects/:id', (req, res) => {
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
});

app.post('/api/v1/projects', (req, res) => {
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
});

app.patch('/api/v1/projects/:id', (req, res) => {
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
});

app.delete('/api/v1/projects/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});