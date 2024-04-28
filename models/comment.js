const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: String,
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    dateNow :{
        type: Date,
        default: Date.now,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;