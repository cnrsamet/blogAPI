const Comment = require('../models/comment');
const Blog = require('../models/Blogs');
const mongoose = require('mongoose');



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

exports.deleteComment = async (req, res) => {
    const userId = req.userData.userId; //Token'dan user id
    const commentId = req.params.commentId; // URL comment id
    const blogId = req.params.id; // URL blog id

    if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(commentId)) { //Blog ve Comment kontrol
        return res.status(404).json({ error: "Geçersiz blog veya yorum ID." });
    }

    try {
        const comment = await Comment.findById(commentId).populate({
            path: 'blogId',
            match: { _id: blogId }
        });

        if (!comment || !comment.blogId) {
            return res.status(404).json({ error: "Blog veya yorum bulunamadı." });
        }

        if (userId.toString() !== comment.userId.toString()) {
            return res.status(403).json({ error: "Yorumu sadece yorum sahibi silebilir!" });
        }

        await Comment.deleteOne({ _id: commentId });
        res.json({ message: "Yorum başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


