import api from '../config';

const ENDPOINT = '/courses/';

export const courseApi = {
  getCourses: async (params) => {
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
      console.error('Error fetching courses:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách khóa học'
      };
    }
  },
  getCourseById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin khoá học'
      };
    }
  },
  createCourse: async (data) => {
    try {
      const response = await api.post(ENDPOINT, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating course:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tạo khoá học'
      };
    }
  },
  updateCourse: async (id, data) => {
    try {
      const response = await api.put(`${ENDPOINT}${id}`, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating course:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật khoá học'
      };
    }
  },
};

export const CourseStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};

export const CourseStatusText = {
  [CourseStatus.PENDING]: "Chờ khai giảng",
  [CourseStatus.ACTIVE]: "Đang diễn ra",
  [CourseStatus.COMPLETED]: "Đã kết thúc",
};

export const CourseLevel = {
  BASIC: 'BASIC',
  ADVANCED: 'ADVANCED',
};

export const CourseLevelText = {
  [CourseLevel.BASIC]: 'Cơ bản',
  [CourseLevel.ADVANCED]: 'Nâng cao',
};

export function getCourseStatusBadgeProps(status) {
  let className = "mx-auto font-semibold border-0";
  let label = "Không xác định";
  // Enum or Vietnamese
  if (
    status === CourseStatus.PENDING || status === "PENDING" || status === "Chờ khai giảng" || status === "Sắp diễn ra"
  ) {
    className += " bg-[#F0F8FF] text-[#0973DC]";
    label = CourseStatusText[CourseStatus.PENDING];
  } else if (
    status === CourseStatus.ACTIVE || status === "ACTIVE" || status === "Đang diễn ra"
  ) {
    className += " bg-[#ECFDF2] text-[#008A2E]";
    label = CourseStatusText[CourseStatus.ACTIVE];
  } else if (
    status === CourseStatus.COMPLETED || status === "COMPLETED" || status === "Đã kết thúc"
  ) {
    className += " bg-[#EDEDED] text-[#171717]";
    label = CourseStatusText[CourseStatus.COMPLETED];
  } else {
    className += " bg-[#F4F4F5] text-[#71717A]";
    // If status is a string in Vietnamese, show as is
    if (typeof status === 'string' && status && status !== 'null' && status !== 'undefined') {
      label = status;
    }
  }
  return {
    className,
    children: label
  };
}

export function validateCourseData(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Vui lòng nhập tên khoá học';
  if (!data.subject?.trim()) errors.subject = 'Vui lòng chọn bộ môn';
  if (!data.total_sessions || data.total_sessions <= 0) errors.total_sessions = 'Tổng số buổi phải lớn hơn 0';
  if (!data.opening_date) errors.opening_date = 'Vui lòng chọn ngày khai giảng';
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export default courseApi; 