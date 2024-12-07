const jwt = require("jsonwebtoken");

// Secret key should be stored securely in environment variables
const SECRET_KEY = process.env.JWT_SECRET || "secretKey";

// Generate JWT with full user data
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );
};

// Verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
