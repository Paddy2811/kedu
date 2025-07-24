import api from '../config';

export const scheduleApi = {
  // Create schedule
  createSchedule: async (scheduleData) => {
    try {
      const response = await api.post('/schedules/', scheduleData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating schedule:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi tạo lịch học',
      };
    }
  }
}; 