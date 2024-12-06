const bcrypt = require("bcryptjs");
const db = require("../config/db"); // Database connection
const { generateToken } = require("../utils/tockenService"); // Import JWT utility

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // 'name' -> 'username'

    // Validate input
    if (!name || !email || !password) {  // 'name' -> 'username'
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const [existingUser] = await db.query( // No need for .promise()
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [result] = await db.query( // No need for .promise()
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", // 'password' -> 'password_hash'
      [name, email, hashedPassword] // 'name' -> 'username'
    );

    // Respond with success
    res.status(201).json({
      message: "User registered successfully",
      user: { id: result.insertId, name, email }, // 'name' -> 'username'
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const [users] = await db.query( // No need for .promise()
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password_hash); // 'password' -> 'password_hash'
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(user.id);

    // Respond with token
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email }, // 'name' -> 'username'
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
