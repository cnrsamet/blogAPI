const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : String,
    description : String,
    dateNow :{
        type: Date,
        default: Date.now,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;