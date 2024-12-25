import api from './api';

// User Signup
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed.");
  }
};

// User Login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response;
    // Save token to localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

// User Logout
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Get Current User
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check Authentication Status
export const isAuthenticated = () => !!localStorage.getItem('authToken');
