const express = require('express');
const viewController = require('./../controllers/viewController');



const router = express.Router();

router.get('/projects', viewController.getProjects);
router.get('/users', viewController.getUsers);

module.exports = router;