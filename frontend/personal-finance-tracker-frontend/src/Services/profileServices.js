import api from './api'; // Assuming `api` is the configured Axios instance

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile.");
  }
};

// Update User Profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile.");
  }
};
