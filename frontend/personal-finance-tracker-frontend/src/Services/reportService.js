import api from './api';

// Fetch Income Statement for Current User
export const getIncomeStatement = async (startDate, endDate, format) => {
  try {
    const response = await api.get('/report/income-statement', {
      params: { startDate, endDate, format },
      withCredentials: true
    });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch income statement.");
  }
};

// Fetch Cash Flow Statement for Current User
export const getCashFlowStatement = async (startDate, endDate, format) => {
  try {
    const response = await api.get('/report/cash-flow', {
      params: { startDate, endDate, format },
      withCredentials: true
    });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch cash flow statement.");
  }
};

// Fetch Balance Sheet for Current User
export const getBalanceSheet = async (date, format) => {
  try {
    const response = await api.get('/report/balance-sheet', {
      params: { date, format },
      withCredentials: true
    });
    return response || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch balance sheet.");
  }
};
