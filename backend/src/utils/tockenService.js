const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "secretKey", {
    expiresIn: "1d",
  });
};

// Verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, "secretKey");
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
