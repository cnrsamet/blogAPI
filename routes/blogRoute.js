const express = require('express');
const blogController = require('../controllers/blogController');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

//localholst/api/blogs
router.route('/').get(blogController.getAllBlogs);
router.route('/create').post(checkToken, blogController.createBlog);
router.route('/:id').get(blogController.getBlog);
router.route('/:id').put(checkToken, blogController.updateBlog);
router.route('/:id').delete(checkToken, blogController.deleteBlog);

module.exports = router;
