const express = require('express');
// own module
const projectController = require('./../controllers/projectController');



const router = express.Router();

// router.param('id', projectController.checkId);

router.route('/').get(projectController.getAllProjects).post(projectController.createProject);
router.route('/:id').get(projectController.getProject).patch(projectController.updateProject).delete(projectController.deleteProject);

module.exports = router;