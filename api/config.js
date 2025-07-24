import axios from 'axios';
import { authApi } from './services/auth';

// =============================================================================
// API Configuration
// =============================================================================

const SECONDS = 1000; // 1 second = 1000 milliseconds

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_DOMAIN || 'http://localhost:3000',
  BASE_PATH: import.meta.env.VITE_API_PATH || '/api/v1',
  TIMEOUT: 30 * SECONDS, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// =============================================================================
// Axios Instance
// =============================================================================

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL + API_CONFIG.BASE_PATH,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// =============================================================================
// Auth Utilities
// =============================================================================

function clearAuthData() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth:cleared'));
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

function setTokens(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}

// =============================================================================
// Token Refresh Management
// =============================================================================

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const addToQueue = () => {
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

// =============================================================================
// Refresh Token Function
// =============================================================================

async function refreshAccessToken() {
  const result = await authApi.refreshToken();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data.access_token;
}

// =============================================================================
// Request Interceptor
// =============================================================================

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// =============================================================================
// Response Interceptor
// =============================================================================

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Only handle 401 errors and avoid retry loops
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, add to queue
    if (isRefreshing) {
      return addToQueue()
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api.request(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    // Start refresh process
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      
      // Process queued requests
      processQueue(null, newAccessToken);
      
      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api.request(originalRequest);
      
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      
      // Process queued requests with error
      processQueue(refreshError, null);
      
      // Clear auth data and redirect to login
      clearAuthData();
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      
    } finally {
      isRefreshing = false;
    }

    return Promise.reject(error);
  }
);

// =============================================================================
// Exports
// =============================================================================

export { clearAuthData, getAccessToken, getRefreshToken, setTokens };
export default api; 