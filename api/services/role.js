import api from '../config';
export const roleApi = {
  getRoles: async (params = {page: 1, pagesize: 10, filters: {}}) => {
    try {
      const response = await api.get('/roles/', {params});
    return {
      success: true,
      items: response.data.items || [],
      total: response.data.total || 0,
      page: response.data.page || params.page,
      pageSize: response.data.pagesize || params.pagesize,
    };
    } catch (error) {
      console.error('Error fetching role options:', error);
      return {
        success: false,
        items: [],
        total: 0,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách vai trò',
      };
    }
  },
};

export default roleApi;