import api from './api';

// Fetch Categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories', { withCredentials: true });
    return response || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories.");
  }
};

// Add Category
export const addCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData, { withCredentials: true });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add category.");
  }
};

// Update Category
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, updatedData, { withCredentials: true });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update category.");
  }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
  try {
    await api.delete(`/categories/${categoryId}`, { withCredentials: true });
    return { message: "Category deleted successfully" };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete category.");
  }
};
