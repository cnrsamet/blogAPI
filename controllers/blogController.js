const Blog = require('../models/Blogs');



exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
  };

exports.createBlog = async (req, res) => {
    const userId = req.userData.userId;
    const newPost = {
        title : req.body.title,
        description: req.body.description,
        user: userId,
    };
    try{
        const post = await Blog.create(newPost);
        res.json(post);
    } catch(error){
        res.status(500).json({error: error.message });
    }
};


exports.getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send({error: "Blog Bulunamadı."});
    }    
    res.json(blog);
};

exports.updateBlog = async (req, res) => {
    const userId = req.userData.userId;   
    try {
        const upBlog = await Blog.findOne({_id: req.params.id});
        if (!upBlog) {
            return res.status(404).send({message: "Blog Bulunamadı!"});
        }
        // Kullanıcı kontrolü, blog sahibi ile eşleşmeli
        if (upBlog.user.toString() !== userId) {
            return res.status(403).json({ error: "Yazıyı sadece yazarı değiştirebilir." });
        }
        upBlog.title = req.body.title;
        upBlog.description = req.body.description;
        await upBlog.save();
        res.redirect(`/api/blogs/${req.params.id}`);
    } catch (error) {
        res.status(500).send({ message: "Server error" });  // Sunucu hatası durumunda
    }
};



exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/api/blogs');
}