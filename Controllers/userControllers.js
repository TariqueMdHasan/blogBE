const User = require('../Models/userModel.js');


// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({ id: updatedUser._id, username: updatedUser.username, email: updatedUser.email });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };