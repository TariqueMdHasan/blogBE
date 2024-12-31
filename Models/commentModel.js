const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    content: {
        type: String,
        required: [true, 'comment cannot be empty'],
        minlength: [1, 'comment cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Comment', commentSchema);