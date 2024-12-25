import api from './api';

// Get summary for the last 30 days
export const getSummary = async () => {
  try {
    const response = await api.get("/transaction/summary", { withCredentials: true });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch summary.");
  }
};

// Fetch Transactions
export const getTransactions = async () => {
  try {
    const response = await api.get('/transaction/list', { withCredentials: true });
    return response || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch transactions.");
  }
};

// Fetch Transactions by User ID
export const getTransactionsByUserId = async (userId) => {
  try {
    const response = await api.get(`/transaction/user/${userId}`, { withCredentials: true });
    return response || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user transactions.");
  }
};

// Add Transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transaction/add', transactionData, { withCredentials: true });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add transaction.");
  }
};

// Update Transaction
export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await api.put(`/transaction/update/${transactionId}`, updatedData, { withCredentials: true });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update transaction.");
  }
};

// Delete Transaction
export const deleteTransaction = async (transactionId) => {
  try {
    await api.delete(`/transaction/delete/${transactionId}`, { withCredentials: true });
    return { message: "Transaction deleted successfully" };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete transaction.");
  }
};
