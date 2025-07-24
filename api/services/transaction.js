import api from "../config";

/**
 * Get transaction list with pagination and search
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.keyword - Search keyword
 * @returns {Promise<Object>} - Transaction list response
 */
export const getTransactions = async (params = {}) => {
  try {
    const response = await api.get("/transactions", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get transaction by ID
 * @param {string} id - Transaction ID
 * @returns {Promise<Object>} - Transaction data
 */
export const getTransactionById = async (id) => {
  try {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction ${id}:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Create a new transaction (receipt or payment)
 * @param {Object} data - Transaction data
 * @returns {Promise<Object>} - Created transaction
 */
export const createTransaction = async (data) => {
  try {
    const response = await api.post("/transactions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update transaction status
 * @param {string} id - Transaction ID
 * @param {string} status - New status
 * @returns {Promise<Object>} - Updated transaction
 */
export const updateTransactionStatus = async (id, status) => {
  try {
    const response = await api.patch(`/transactions/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating transaction ${id} status:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete transaction
 * @param {string} id - Transaction ID
 * @returns {Promise<Object>} - Response
 */
export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting transaction ${id}:`, error);
    return { success: false, error: error.message };
  }
}; 