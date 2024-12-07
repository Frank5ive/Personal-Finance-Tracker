const express = require("express");
const sequelize = require("./config/db");  // Sequelize connection
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Test Database Connection and Sync Models
(async () => {
  try {
    await sequelize.sync(); // Sync models with DB
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Database sync error:", err.message);
    process.exit(1); // Exit if sync fails
  }
})();

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Catch-All for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err.message || err);
  res.status(500).json({
    message: "An internal server error occurred",
    error: err.message || "Unexpected error",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
