const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser } = require('../Controllers/authControllers.js');
const protect = require('../Middleware/authMiddleware.js');

router.post('/register', register);
router.post('/login', login);
router.put('/update', protect, updateUser);
router.delete('/delete', protect, deleteUser);



module.exports = router;