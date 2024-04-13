const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

//localholst/api/blogs
router.route('/').get(blogController.getAllBlogs);
router.route('/create').post(auth, blogController.createBlog);
router.route('/:id').get(blogController.getBlog);
router.route('/:id').put(auth, blogController.updateBlog);
router.route('/:id').delete(blogController.deleteBlog);

module.exports = router;
