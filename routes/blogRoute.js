const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

//localholst/api/blogs

router.route('/').post(blogController.createBlog);
router.route('/').get(blogController.getAllBlogs);
router.route('/:id').get(blogController.getBlog);
router.route('/:id').put(blogController.updateBlog);
router.route('/:id').delete(blogController.deleteBlog);

module.exports = router;
