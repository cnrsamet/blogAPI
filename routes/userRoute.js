const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//localholst/api/users
router.route('/').get(userController.getAllUsers);
router.route('/create').post(userController.userCreate);
router.route('/:id').delete(userController.deleteUser);
router.route('/:id').put(userController.updateUser);

module.exports = router;