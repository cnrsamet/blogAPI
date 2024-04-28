const express = require('express');
const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');

const checkToken = require('../middleware/checkToken');

const router = express.Router();

//localholst/api/blogs
router.route('/').get(blogController.getAllBlogs);
router.route('/create').post(checkToken, blogController.createBlog);
router.route('/:id').get(blogController.getBlog);
router.route('/:id').put(checkToken, blogController.updateBlog);
router.route('/:id').delete(checkToken, blogController.deleteBlog);

router.route('/:id/comment').post(checkToken, commentController.sendComment);
router.route('/:id/comment').get(checkToken, commentController.getComments);


module.exports = router;
