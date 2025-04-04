const Category = require("../models/Category");

// Add Category
const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    if (!name || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const category = new Category({ userId, name, type });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const userId = req.user.id;

    const category = await Category.findOne({ _id: id, userId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.type = type;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({ _id: id, userId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.remove();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Categories
const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await Category.find({ userId }).sort({ name: "asc" });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
