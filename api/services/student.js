import api from '../config';

const ENDPOINT = '/students/';

export const studentApi = {
  getStudents: async (params) => {
    try {
      const response = await api.get(ENDPOINT, { params });
      return {
        success: true,
        data: {
          items: response.data.items || [],
          total: response.data.total || 0,
          page: response.data.page || 1,
          pageSize: response.data.pagesize || 10
        }
      };
    } catch (error) {
      console.error('Error fetching students:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách học viên'
      };
    }
  },
  
  getStudentById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching student:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin học viên'
      };
    }
  },
  
  createStudent: async (data) => {
    try {
      const response = await api.post(ENDPOINT, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating student:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tạo học viên'
      };
    }
  },
  
  updateStudent: async (id, data) => {
    try {
      const response = await api.put(`${ENDPOINT}${id}`, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating student:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật học viên'
      };
    }
  },
  
  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi xóa học viên'
      };
    }
  },

  // Get enrolled classes for a student
  getEnrolledClasses: async (studentId, params = {}) => {
    try {
      const response = await api.get(`${ENDPOINT}${studentId}/enrolled-classes`, { params });
      return {
        success: true,
        data: {
          items: response.data.items || [],
          total: response.data.total || 0,
          page: response.data.page || 1,
          pageSize: response.data.pagesize || 10,
          totalPages: response.data.total_pages || 1
        }
      };
    } catch (error) {
      console.error('Error fetching enrolled classes:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách lớp học đã đăng ký'
      };
    }
  },

  // Additional helper methods
  validateStudentData: (data) => {
    const errors = {};
    
    if (!data.full_name?.trim()) {
      errors.full_name = "Vui lòng nhập họ và tên";
    }

    if (!data.phone_number?.trim()) {
      errors.phone_number = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(data.phone_number.trim())) {
      errors.phone_number = "Số điện thoại không hợp lệ";
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Email không hợp lệ";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}; 