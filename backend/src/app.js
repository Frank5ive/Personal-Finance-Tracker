const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  // Mongoose connection
require("dotenv").config();  // Load environment variables
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactions = require("./routes/transactionRoutes");
const categories = require("./routes/categoryRoutes");
const report = require("./routes/reportRoutes");
const Notification = require("./routes/notificationRoutes"); 

const app = express();

// Enable CORS for Frontend
app.use(cors({
  origin: "http://localhost:3000",  // Frontend URL
  credentials: true,  // Allow cookies
}));

app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("MongoDB connection error: DB_URL is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(dbUrl).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1); // Exit if connection fails
});

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// API Routes
app.use("/api/categories", categories);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactions);
app.use("/api/report", report);
app.use("/api/notification", Notification);

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
