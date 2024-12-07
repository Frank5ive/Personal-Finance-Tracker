const db = require("../config/db");

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user; // Ensure JWT middleware sets req.user

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Fetch user with named binding
    const users = await db.query(
      "SELECT id, username, email, created_at FROM users WHERE id = :userId",
      {
        replacements: { userId }, // Named binding
        type: db.QueryTypes.SELECT, // Query type explicitly set
      }
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log and send user data
    console.log("Fetched user data:", users[0]);
    res.status(200).json(users[0]);
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

    // Update user with named binding
    const result = await db.query(
      "UPDATE users SET username = :username, email = :email WHERE id = :userId",
      {
        replacements: { username, email, userId }, // Named binding
        type: db.QueryTypes.UPDATE, // Update type
      }
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log and send response
    console.log("Updated user data:", { id: userId, username, email });
    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: userId, username, email },
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
