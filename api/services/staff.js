import api from '../config';

export const staffApi = {
  getStaff: async ({ page = 1, pagesize = 10, role_code = '', keyword = '', filters = {} }) => {
    const params = {
      page,
      pagesize,
      ...(keyword && { keyword }),
      ...(role_code && { role_code }),
      ...filters,
    };

    try {
      const response = await api.get('/staffs/', { params });
      return {
        success: true,
        items: response.data.items || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        pageSize: response.data.pagesize || pagesize,
      };
    } catch (error) {
      console.error('Error fetching staff list:', error);
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách nhân viên',
      };
    }
  },
  
  getStaffById: async (id) => {
    try {
      const response = await api.get(`/staffs/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching staff detail:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi tải thông tin nhân viên',
      };
    }
  },
  
  createStaff: async (data) => {
    try {
      const response = await api.post('/staffs/', {
        ...data,
        role_codes: data.role_code ? [data.role_code] : [],
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating staff:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi tạo nhân viên',
      };
    }
  },
  
  updateStaff: async (id, data) => {
    try {
      const response = await api.put(`/staffs/${id}`, {
        ...data,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating staff:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi cập nhật nhân viên',
      };
    }
  },
  
  deleteStaff: async (id) => {
    try {
      const response = await api.delete(`/staffs/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi xóa nhân viên',
      };
    }
  },
  
  getRoles: async ({ page = 1, pagesize = 10 } = {}) => {
    try {
      const response = await api.get('/roles/', { params: { page, pagesize } });
      return {
        success: true,
        items: response.data.items || [],
        total: response.data.total || 0,
      };
    } catch (error) {
      console.error('Error fetching roles:', error);
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy nhóm quyền',
      };
    }
  },

  // Additional helper methods
  validateStaffData: (data) => {
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

export default staffApi;