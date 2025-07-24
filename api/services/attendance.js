import api from '../config';

// ============================================================================
// CONSTANTS
// ============================================================================

const ATTENDANCE_STATUSES = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED',
  NOT_CHECKED: 'NOT_CHECKED'
};

const BADGE_STYLES = {
  PRESENT: {
    className: "bg-[#ECFDF2] text-[#008A2E] hover:bg-[#ECFDF2]",
    session: {
      bgColor: "bg-[#ECFDF2]",
      textColor: "text-[#008A2E]",
      borderColor: "border-[1.5px] border-[#D3FDE5]",
      borderColorHighlight: "border-[2px] border-[#D3FDE5]"
    }
  },
  ABSENT: {
    className: "bg-[#FFF0F0] text-[#E60000] hover:bg-[#FFF0F0]",
    session: {
      bgColor: "bg-[#FFF0F0]",
      textColor: "text-[#E60000]",
      borderColor: "border-[1.5px] border-[#FFD6D6]",
      borderColorHighlight: "border-[2px] border-[#FFD6D6]"
    }
  },
  LATE: {
    className: "bg-[#FFFCF0] text-[#DC7609] hover:bg-[#FFFCF0]",
    session: {
      bgColor: "bg-[#FFFCF0]",
      textColor: "text-[#DC7609]",
      borderColor: "border-[1.5px] border-[#FFF4D1]",
      borderColorHighlight: "border-[2px] border-[#FFF4D1]"
    }
  },
  EXCUSED: {
    className: "bg-[#F0F8FF] text-[#0066CC] hover:bg-[#F0F8FF]",
    session: {
      bgColor: "bg-[#F0F8FF]",
      textColor: "text-[#0066CC]",
      borderColor: "border-[1.5px] border-[#CCE5FF]",
      borderColorHighlight: "border-[2px] border-[#CCE5FF]"
    }
  },
  NOT_CHECKED: {
    className: "bg-[#EDEDED] text-[#171717] hover:bg-[#EDEDED]",
    session: {
      bgColor: "bg-[#EDEDED]",
      textColor: "text-[#171717]",
      borderColor: "border-[1.5px] border-[#E5E5E5]",
      borderColorHighlight: "border-[2px] border-[#E5E5E5]"
    }
  }
};

const SESSION_CONFIG = {
  CLOSEST_SESSION_CODE: "B10",
  BASE_CLASSES: "flex flex-col justify-center items-center w-8 h-8 rounded-full text-xs font-medium",
  HIGHLIGHT_STYLE: "shadow-sm"
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================



/**
 * Get badge style configuration for a status
 * @param {string} status - The attendance status
 * @returns {Object} - Badge style configuration
 */
const getBadgeStyleConfig = (status) => {
  return BADGE_STYLES[status] || BADGE_STYLES[ATTENDANCE_STATUSES.NOT_CHECKED];
};

// ============================================================================
// BADGE UTILITIES
// ============================================================================

export const attendanceUtils = {
  /**
   * Get attendance status badge configuration
   * @param {string} status - The attendance status
   * @param {Function} t - Translation function
   * @returns {Object} - Badge configuration with className and text
   */
  getStatusBadgeConfig: (status, t) => {
    const styleConfig = getBadgeStyleConfig(status);
    
    return {
      className: styleConfig.className,
      text: t(`attendance.attendance_status.${status}`)
    };
  },

  /**
   * Get session badge configuration
   * @param {Object} sessionObj - The session object
   * @param {number} sessionObj.idx - Session index (e.g., 1, 2, 3)
   * @param {string} sessionObj.status - Session status
   * @returns {Object} - Session badge configuration
   */
  getSessionBadgeConfig: (sessionObj) => {
    const isClosestSession = sessionObj.idx === 1; // Buổi 1 là buổi gần nhất
    const styleConfig = getBadgeStyleConfig(sessionObj.status);
    const sessionStyle = styleConfig.session;
    
    const borderColor = isClosestSession 
      ? sessionStyle.borderColorHighlight 
      : sessionStyle.borderColor;
    
    const closestSessionStyles = isClosestSession ? SESSION_CONFIG.HIGHLIGHT_STYLE : "";

    return {
      className: `${SESSION_CONFIG.BASE_CLASSES} ${sessionStyle.bgColor} ${sessionStyle.textColor} ${borderColor} ${closestSessionStyles}`,
      code: `B${sessionObj.idx}` // Ghép chữ B với idx để tạo code (B1, B2, B3...)
    };
  },

  /**
   * Convert API attendance data to UI format
   * @param {Array} apiData - Raw API attendance data
   * @returns {Array} - Formatted attendance data for UI
   */
  convertApiDataToUI: (apiData) => {
    if (!Array.isArray(apiData)) return [];
    
    return apiData.map(attendance => ({
      id: attendance.student_id,
      attendance_id: attendance.id, // Thêm attendance_id để sử dụng cho API update
      session_id: attendance.session_id, // Lấy session_id từ API response
      student_full_name: attendance?.student_full_name || '',
      student_code: attendance?.student_code || '',
      student_phone_number: attendance?.student_phone_number || '',
      status: attendance.status || "NOT_CHECKED",
      reason: attendance.note || null,
      sessions: attendance.sessions || [] // Sử dụng sessions từ API
    }));
  },

  /**
   * Convert UI attendance data to API format
   * @param {Object} uiData - UI attendance data
   * @param {number} classId - Class ID
   * @param {number} facilityId - Facility ID
   * @param {string} date - Study date
   * @param {number} sessionId - Session ID (optional)
   * @returns {Object} - API format attendance data
   */
  convertUIToApiData: (uiData, classId, facilityId, date, sessionId = null) => {
    const apiData = {
      student_class_id: parseInt(classId),
      student_id: uiData.id,
      facility_id: parseInt(facilityId),
      date: date,
      status: uiData.status,
      note: uiData.reason || null
    };
    
    // Add session_id if provided
    if (sessionId) {
      apiData.session_id = parseInt(sessionId);
    }
    
    return apiData;
  }
};

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Handle API error responses
 * @param {Error} error - Error object
 * @param {string} defaultMessage - Default error message
 * @returns {Object} - Standardized error response
 */
const handleApiError = (error, defaultMessage) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.response?.data?.message || defaultMessage
  };
};

/**
 * Handle API success responses
 * @param {Object} response - API response
 * @param {string} dataKey - Key to extract data from response
 * @returns {Object} - Standardized success response
 */
const handleApiSuccess = (response, dataKey = 'data') => {
  return {
    success: true,
    data: response[dataKey] || response,
    total: response.total || 0,
    page: response.page || 1,
    pageSize: response.pagesize || 10,
    session_info: response.session_info || null
  };
};

export const attendanceApi = {
  /**
   * Get attendance list by class and study date
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.pagesize - Items per page
   * @param {string} params.study_date - Study date in YYYY-MM-DD format
   * @param {number} params.class_id - Class ID
   * @param {number} params.facility_id - Facility ID
   * @param {string} params.keyword - Search keyword (optional, minimum 3 characters)
   * @returns {Promise<Object>} - Attendance list response
   */
  getAttendances: async (params = {}) => {
    try {
      const response = await api.get('/attendances/', { params });
      return handleApiSuccess(response.data, 'items');
    } catch (error) {
      return handleApiError(error, 'Có lỗi xảy ra khi tải danh sách điểm danh');
    }
  },

  /**
   * Create or update attendance for a student
   * @param {Object} data - Attendance data
   * @returns {Promise<Object>} - Created/updated attendance
   */
  createOrUpdateAttendance: async (data) => {
    try {
      const response = await api.post('/attendances/', data);
      return handleApiSuccess(response.data);
    } catch (error) {
      return handleApiError(error, 'Có lỗi xảy ra khi lưu điểm danh');
    }
  },

  /**
   * Get attendance statistics for a class
   * @param {Object} params - Query parameters
   * @param {number} params.class_id - Class ID
   * @param {string} params.study_date - Study date
   * @param {number} params.facility_id - Facility ID
   * @returns {Promise<Object>} - Attendance statistics
   */
  getAttendanceStats: async (params = {}) => {
    try {
      const response = await api.get('/attendances/stats/', { params });
      return handleApiSuccess(response.data);
    } catch (error) {
      return handleApiError(error, 'Có lỗi xảy ra khi tải thống kê điểm danh');
    }
  },

  /**
   * Update attendance for a specific student
   * @param {number} attendanceId - Attendance ID
   * @param {Object} data - Update data
   * @param {string} data.status - Attendance status (PRESENT, ABSENT, LATE, EXCUSED, NOT_CHECKED)
   * @param {string} data.note - Optional note/reason
   * @returns {Promise<Object>} - Updated attendance
   */
  updateAttendance: async (attendanceId, data) => {
    try {
      const response = await api.patch(`/attendances/${attendanceId}`, data);
      return handleApiSuccess(response.data);
    } catch (error) {
      return handleApiError(error, 'Có lỗi xảy ra khi cập nhật điểm danh');
    }
  },

  /**
   * Get attendance detail by ID
   * @param {number} attendanceId - Attendance ID
   * @returns {Promise<Object>} - Attendance detail
   */
  getAttendanceDetail: async (attendanceId) => {
    try {
      const response = await api.get(`/attendances/${attendanceId}`);
      return handleApiSuccess(response.data);
    } catch (error) {
      return handleApiError(error, 'Có lỗi xảy ra khi tải chi tiết điểm danh');
    }
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ATTENDANCE_STATUSES,
  BADGE_STYLES
}; 