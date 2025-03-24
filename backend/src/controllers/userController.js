const User = require("../models/User");

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user; // Ensure JWT middleware sets req.user

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Fetch user by ID
    const user = await User.findById(userId).select("id username email createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log and send user data
    console.log("Fetched user data:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { username, email } = req.body;

    // Validate request data
    if (!userId || !username || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update user by ID
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    ).select("id username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log and send response
    console.log("Updated user data:", user);
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
