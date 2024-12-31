const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);