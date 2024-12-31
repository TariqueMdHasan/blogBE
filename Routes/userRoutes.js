const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../Controllers/userControllers.js");
const protect = require("../Middleware/authMiddleware.js");
const { admin } = require("../Middleware/adminMiddleware.js");

const router = express.Router();

// Admin: Get all users
router.get("/", protect, admin, getAllUsers);

// Admin & User: Get a user by ID
router.get("/:id", protect, getUserById);

// User: Update their profile
router.put("/profile", protect, updateUser);

// Admin: Delete a user by ID
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
