const Comment = require('../models/comment');
const Blog = require('../models/Blogs');



exports.getComments = async (req, res) => {
    const blogId = req.params.id; // URL'den blog ID'si alınıyor.
    try {
        const blog = await Blog.findById(blogId); // Blog'un varlığını kontrol et.
        if (!blog) {
            return res.status(404).send({error: "Blog Bulunamadı."});
        }

        const comments = await Comment.find({ blogId: blogId }); // Blog ID'ye göre yorumları bul.
        if (comments.length === 0) {
            return res.status(404).send({error: "Blogta henüz yorum yok!"});
        }

        res.json(comments); // Yorumlar varsa, döndür.
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};




exports.sendComment = async (req, res) => {
    const userId = req.userData.userId; // Kullanıcı ID'si token'dan
    const blogId = req.params.id; // Blog ID'si URL

    const newComment = {
        comment: req.body.comment, 
        userId: userId, // Kullanıcı ID
        blogId: blogId, // Blog ID
        dateNow: Date.now()
    };

    try {
        const comment = await Comment.create(newComment);
        res.json(comment); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
