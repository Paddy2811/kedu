import axios from '../config';

// Order status enum
export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
};

// Payment status enum
export const PaymentStatus = {
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  UNPAID: 'UNPAID',
};

// API for order management
export const orderApi = {
  /**
   * Create a new order
   * @param {Object} data - Order data
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async createOrder(data) {
    try {
      const res = await axios.post('/orders', data);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.detail || err?.message || 'Unknown error',
      };
    }
  },
  /**
   * Fetch order list with pagination and search
   * @param {Object} params - { page, pagesize, keyword }
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async getOrders({ page = 1, pagesize = 10, keyword = '' } = {}) {
    try {
      const res = await axios.get('/orders/', {
        params: { page, pagesize, keyword },
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.detail || err?.message || 'Unknown error',
      };
    }
  },
  /**
   * Fetch order detail by ID
   * @param {number|string} id - Order ID
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async getOrderDetail(id) {
    try {
      const res = await axios.get(`/orders/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.detail || err?.message || 'Unknown error',
      };
    }
  },
  /**
   * Confirm an order by ID
   * @param {number|string} id - Order ID
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async confirmOrder(id) {
    try {
      const res = await axios.patch(`/orders/${id}/confirm`);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.detail || err?.message || 'Unknown error',
      };
    }
  },
}; 