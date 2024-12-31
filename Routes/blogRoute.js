const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../Controllers/blogControllers.js');
const protect = require('../Middleware/authMiddleware.js');


router.get('/', getAllBlogs);
router.post('/create', protect, createBlog);
router.put('/update/:id', protect, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

module.exports = router; 