const express = require('express');
// own modules
const userController = require('./../controllers/userController');



const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;