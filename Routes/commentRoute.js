const express = require('express');
const router = express.Router();
const { addComment, updateComment, deleteComment, getCommentForBlogs } = require('../Controllers/commentControllers.js');
const protect = require('../Middleware/authMiddleware.js');


router.get('/:blogId', getCommentForBlogs);
router.post('/', protect, addComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);


module.exports = router;