import api from '../config';

export const sessionApi = {
  // Get sessions by class ID with pagination
  getSessionsByClass: async ({ classId, page = 1, pagesize = 10 }) => {
    try {
      const params = { class_id: classId, page, pagesize };
      const response = await api.get('/sessions/', { params });
      return {
        success: true,
        items: response.data.items || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageSize: response.data.pagesize || pagesize,
      };
    } catch (error) {
      console.error('Error fetching sessions by class:', error);
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi lấy danh sách buổi học theo lớp',
      };
    }
  },

  // Get sessions by facility and study date
  getSessionsByFacility: async ({ page = 1, pagesize = 10, study_date, facility_id }) => {
    try {
      const params = { page, pagesize };
      if (study_date) params.study_date = study_date;
      if (facility_id) params.facility_id = facility_id;
      const response = await api.get('/sessions/classes', { params });
      return {
        success: true,
        items: response.data.items || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageSize: response.data.pagesize || pagesize,
      };
    } catch (error) {
      console.error('Error fetching sessions by facility:', error);
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi lấy danh sách buổi học theo cơ sở',
      };
    }
  },

  // Create a new session
  createSession: async (data) => {
    try {
      const response = await api.post('/sessions/', data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating session:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi tạo buổi học',
      };
    }
  }
}; 