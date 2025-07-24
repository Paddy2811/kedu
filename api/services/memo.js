import axios from '../config';

export const memoApi = {
  /**
   * Fetch memos/history for a reference object
   * @param {Object} params - { ref_type, ref_id, page, page_size }
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async getMemos({ ref_type, ref_id, page = 1, page_size = 10 }) {
    try {
      const res = await axios.get('/memos/', {
        params: { ref_type, ref_id, page, page_size },
      });
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err?.response?.data?.detail || err?.message || 'Unknown error',
      };
    }
  },
}; 