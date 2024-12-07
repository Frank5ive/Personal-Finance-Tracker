const { verifyToken } = require("../utils/tockenService");

// Protect middleware to check if token exists and is valid
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = verifyToken(token); // Verify token
    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if the user has admin privileges
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if the user is an admin
  } else {
    res.status(403).json({ message: "Access denied, admin-only resource" });
  }
};

module.exports = {
  protect,
  adminOnly,
};
