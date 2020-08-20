const express = require('express');
const viewController = require('./../controllers/viewController');



const router = express.Router();

router.get('/projects', viewController.getProjects);
router.get('/projects/:id', viewController.getProject);
router.get('/update-project/:id', viewController.updateProject);
router.get('/users', viewController.getUsers);
router.get('/add-new-project', viewController.addNewProject);

module.exports = router;