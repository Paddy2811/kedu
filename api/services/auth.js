import api, { clearAuthData, getAccessToken, getRefreshToken, setTokens } from '../config';

// =============================================================================
// Token Management
// =============================================================================

function storeUserData(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

function CLEAR_USER_DATA() {
  // This helper is kept for potential future use.
  localStorage.removeItem('user');
}

// =============================================================================
// Auth API Functions
// =============================================================================

export const authApi = {
  // Login with username/password
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      if (!response.data?.access_token) {
        return {
          success: false,
          error: 'Token không hợp lệ'
        };
      }

      // Store tokens and user data
      const { access_token, refresh_token, ...userData } = response.data;
      setTokens(access_token, refresh_token);
      storeUserData(userData);

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Clear any existing tokens if login fails
      clearAuthData();
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng nhập thất bại'
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      clearAuthData();
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear data even if API call fails
      clearAuthData();
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng xuất thất bại'
      };
    }
  },

  // Get current user info
  me: async () => {
    try {
      const response = await api.get('/auth/me');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return {
          success: false,
          error: 'No refresh token available'
        };
      }

      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      });

      const { access_token, refresh_token: newRefreshToken } = response.data || {};
      if (!access_token) {
        return {
          success: false,
          error: 'Invalid refresh response'
        };
      }

      setTokens(access_token, newRefreshToken);
      return {
        success: true,
        data: { access_token, refresh_token: newRefreshToken }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Refresh token failed'
      };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng ký thất bại'
      };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Gửi email thất bại'
      };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đặt lại mật khẩu thất bại'
      };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đổi mật khẩu thất bại'
      };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Cập nhật thông tin thất bại'
      };
    }
  },

  // Get profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Lấy thông tin thất bại'
      };
    }
  }
};

// =============================================================================
// Auth Utilities
// =============================================================================

export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAccessToken();
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Update user data in localStorage
  updateUserData: (userData) => {
    storeUserData(userData);
  },

  // Clear all auth data
  clearAuth: () => {
    clearAuthData();
  },

  // Get access token
  getAccessToken,

  // Get refresh token
  getRefreshToken
};

export default authApi; 