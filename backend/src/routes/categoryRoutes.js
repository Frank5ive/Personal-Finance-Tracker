const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/categoryController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.post("/", protect, addCategory);          // Add category
router.put("/:id", protect, updateCategory);    // Update category
router.delete("/:id", protect, deleteCategory); // Delete category
router.get("/", protect, getCategories);        // Get all categories

module.exports = router;
