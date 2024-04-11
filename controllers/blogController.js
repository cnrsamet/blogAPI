const Blog = require('../models/Blogs');

exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
  };

exports.createBlog = async (req, res) => {
    const post = await Blog.create(req.body);
    res.json(post);
    //res.redirect('/api/blogs');
};


exports.getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!getBlog) {
        return res.status(404).send({error: "Blog Bulunamadı."});
    }    
    res.json(blog);
};

exports.updateBlog = async (req, res) => {
    const upBlog = await Blog.findOne({_id: req.params.id});
    upBlog.title= req.body.title;
    upBlog.description= req.body.description;
    upBlog.save();
    res.redirect(`/api/blogs/${req.params.id}`);
};

exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/api/blogs');
}