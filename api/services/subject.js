import api from '../config';

export const subjectApi = {
  getAll: async (params = { page: 1, pagesize: 10 }) => {
    try {
      const response = await api.get('/subjects/', { params });
      return {
        success: true,
        items: response.data.items || [],
        total: response.data.total || 0,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách bộ môn',
      };
    }
  },
}; 