
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

//localholst/api/users
router.route('/').get(userController.getAllUsers);
router.route('/login').post(userController.loginUser);
router.route('/create').post(userController.userCreate);
router.route('/:id').delete(userController.deleteUser);
router.route('/:id').put(userController.updateUser);
//router.route('/logout').get(userController.logoutUser);


module.exports = router;
