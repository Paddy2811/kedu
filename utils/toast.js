import { toast } from 'sonner';

// Toast configurations
export const toastConfig = {
  position: 'bottom-right',
  richColors: true,
  duration: 3000,
};

// Error message parser
export const getErrorMessage = (error) => {
  if (Array.isArray(error)) {
    // Pydantic error array
    return error.map(e => e.msg || JSON.stringify(e)).join(', ');
  }
  if (typeof error === 'object' && error !== null) {
    if (error.detail && Array.isArray(error.detail)) {
      return error.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
    }
    return error.msg || JSON.stringify(error);
  }
  return error;
};

// Success messages
export const showSuccessToast = (message) => {
  toast.success(message);
};

// Error messages
export const showErrorToast = (message, error = null) => {
  if (error) {
    console.error(error);
  }
  toast.error(message);
};

// Info messages
export const showInfoToast = (message) => {
  toast.info(message);
};

// Warning messages
export const showWarningToast = (message) => {
  toast.warning(message);
};

// Loading messages with promise
export const showLoadingToast = (promise, { loading, success, error }) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
  });
};

// Common messages
export const TOAST_MESSAGES = {
  // Success messages
  CREATE_SUCCESS: 'Thêm mới thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  DELETE_SUCCESS: 'Xóa thành công',
  SAVE_SUCCESS: 'Lưu thành công',
  
  // Error messages
  CREATE_ERROR: 'Có lỗi xảy ra khi thêm mới',
  UPDATE_ERROR: 'Có lỗi xảy ra khi cập nhật',
  DELETE_ERROR: 'Có lỗi xảy ra khi xóa',
  LOAD_ERROR: 'Có lỗi xảy ra khi tải dữ liệu',
  SAVE_ERROR: 'Có lỗi xảy ra khi lưu',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  
  // Loading messages
  LOADING: 'Đang xử lý...',
  SAVING: 'Đang lưu...',
  DELETING: 'Đang xóa...',
  UPDATING: 'Đang cập nhật...',
}; 