import api from '../config';

const ENDPOINT = '/products/';

export const productApi = {
  getProducts: async (params) => {
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
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách sản phẩm'
      };
    }
  },
  
  getProductById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin sản phẩm'
      };
    }
  },
  
  createProduct: async (data) => {
    try {
      const response = await api.post(ENDPOINT, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tạo sản phẩm'
      };
    }
  },
  
  updateProduct: async (id, data) => {
    try {
      const response = await api.put(`${ENDPOINT}${id}`, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm'
      };
    }
  },
  
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi xóa sản phẩm'
      };
    }
  }
}; 