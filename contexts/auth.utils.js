import { toast } from 'sonner';

export function handleAuthError(error) {
  console.error('Auth error:', error);
  toast.error(error?.response?.data?.message || 'Đã có lỗi xảy ra');
}

export function handleLogoutError(error) {
  console.error('Logout error:', error);
  toast.error('Đã có lỗi khi đăng xuất');
}

export function handleLoginSuccess() {
  toast.success('Đăng nhập thành công');
} 