import api from '../config';

export const facilityApi = {
  getAll: async (params = { page: 1, pagesize: 10, keyword: '' }) => {
    try {
      const response = await api.get('/facilities/', { params });
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
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách cơ sở',
      };
    }
  },
  createFacility: async (data) => {
    try {
      const response = await api.post('/facilities/', data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tạo cơ sở',
      };
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/facilities/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông tin cơ sở',
      };
    }
  },
  updateFacility: async (id, data) => {
    try {
      const response = await api.put(`/facilities/${id}`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật cơ sở',
      };
    }
  },
  getInitInfo: async () => {
    try {
      const response = await api.get('/facilities/init-info');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Không thể lấy thông tin khởi tạo cơ sở' };
    }
  },
}; 