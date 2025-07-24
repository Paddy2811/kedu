import api from '../config';

const ENDPOINT = '/classes/';

export const classApi = {
  getClasses: async (params) => {
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
      console.error('Error fetching classes:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách lớp học'
      };
    }
  },
  
  getClassById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching class:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin lớp học'
      };
    }
  },
  
  createClass: async (data) => {
    try {
      const response = await api.post(ENDPOINT, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating class:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tạo lớp học'
      };
    }
  },
  
  updateClass: async (id, data) => {
    try {
      const response = await api.put(`${ENDPOINT}${id}`, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating class:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật lớp học'
      };
    }
  },
  
  deleteClass: async (id) => {
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
        error: error.response?.data?.detail || 'Có lỗi xảy ra khi xóa lớp học'
      };
    }
  },

  getClassStudents: async (classId, params = {}) => {
    try {
      const response = await api.get(`${ENDPOINT}${classId}/students`, { params });
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
      console.error('Error fetching class students:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách học viên'
      };
    }
  },
  
  getClassStudentDetail: async (classId, studentId) => {
    try {
      const response = await api.get(`${ENDPOINT}${classId}/students/${studentId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching student details:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin học viên'
      };
    }
  },

  getClassSessions: async (classId, params = {}) => {
    try {
      const response = await api.get(`${ENDPOINT}${classId}/sessions`, { params });
      return {
        success: true,
        data: {
          items: response.data.items || [],
          total: response.data.total || 0,
          page: response.data.page || 1,
          pageSize: response.data.pagesize || 10,
        },
      };
    } catch (error) {
      console.error("Error fetching class sessions:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Có lỗi xảy ra khi lấy danh sách buổi học",
      };
    }
  },

  // Helper methods for class status
  validateClassData: (data) => {
    const errors = {};
    
    if (!data.name?.trim()) {
      errors.name = "Vui lòng nhập tên lớp học";
    }

    if (!data.course_id) {
      errors.course_id = "Vui lòng chọn khóa học";
    }

    if (!data.facility_id) {
      errors.facility_id = "Vui lòng chọn cơ sở";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  getInitInfo: async (courseId) => {
    try {
      const response = await api.get(`/classes/init-info/${courseId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Không thể lấy thông tin khởi tạo lớp học' };
    }
  },

  getClassesForRegistration: async (params) => {
    try {
      const response = await api.get('/classes/init-register', { params });
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
      console.error('Error fetching classes for registration:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách lớp học đăng ký'
      };
    }
  }
};

export const ClassStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE", 
  COMPLETED: "COMPLETED",
};

export const ClassStatusText = {
  [ClassStatus.PENDING]: "Chờ khai giảng",
  [ClassStatus.ACTIVE]: "Đang diễn ra",
  [ClassStatus.COMPLETED]: "Đã kết thúc",
};

export const getClassStatusBadgeProps = (status) => {
  switch (status) {
    case ClassStatus.PENDING:
      return {
        variant: "info",
        className: "bg-[#f0f8ff] text-[#0973dc] border-0",
        children: ClassStatusText[ClassStatus.PENDING]
      };
    case ClassStatus.ACTIVE:
      return {
        variant: "success", 
        className: "bg-[#ecfdf2] text-[#008a2e] border-0",
        children: ClassStatusText[ClassStatus.ACTIVE]
      };
    case ClassStatus.COMPLETED:
      return {
        variant: "secondary",
        className: "bg-[#ededed] text-[#171717] border-0",
        children: ClassStatusText[ClassStatus.COMPLETED]
      };
    default:
      return {
        variant: "secondary",
        className: "bg-[#ededed] text-[#171717] border-0",
        children: typeof status === 'string' ? status : "Không xác định"
      };
  }
};

export const SessionStatus = {
  NOT_STARTED: "NOT_STARTED", // chưa bắt đầu
  UPCOMING: "UPCOMING", // sắp diễn ra (trong tương lai gần)
  ONGOING: "ONGOING", // đang diễn ra
  COMPLETED: "COMPLETED", // đã hoàn thành
  CANCELLED: "CANCELLED", // đã hủy
};

export const SessionStatusText = {
  [SessionStatus.NOT_STARTED]: "Chưa diễn ra",
  [SessionStatus.UPCOMING]: "Sắp diễn ra",
  [SessionStatus.ONGOING]: "Đang diễn ra",
  [SessionStatus.COMPLETED]: "Đã hoàn thành",
  [SessionStatus.CANCELLED]: "Đã hủy",
};

// Returns props for status badge & card background in ScheduleTab
export const getSessionStatusBadgeProps = (status) => {
  switch (status) {
    // Not started
    case SessionStatus.NOT_STARTED:
      return {
        label: SessionStatusText[SessionStatus.NOT_STARTED],
        className: "bg-[#EDEDED] text-[#171717] border-0 text-semibold",
      };
    // Upcoming (will start soon)
    case SessionStatus.UPCOMING:
      return {
        label: SessionStatusText[SessionStatus.UPCOMING],
        className: "bg-[#F0F8FF] text-[#0973DC] border-0 font-semibold",
      };
    // Ongoing
    case SessionStatus.ONGOING:
      return {
        label: SessionStatusText[SessionStatus.ONGOING],
        className: "bg-[#FDF5F4] text-[#E67364] border-0 font-semibold",
      };
    // Completed
    case SessionStatus.COMPLETED:
      return {
        label: SessionStatusText[SessionStatus.COMPLETED],
        className: "bg-[#ECFDF2] text-[#008A2E] border-0 font-semibold",
        cardBg: "bg-[#FBFEFC]",
        borderColor: "border-[#BBF7D0]",
      };
    // Cancelled – generated scheme
    case SessionStatus.CANCELLED:
      return {
        label: SessionStatusText[SessionStatus.CANCELLED],
        className: "bg-[#FDECEC] text-[#D32F2F] border-0 font-semibold",
      };
    default:
      return {
        label: typeof status === "string" ? status : "Không xác định",
        className: "bg-[#ededed] text-[#171717] border-0 font-semibold",
      };
  }
};

export default classApi; 