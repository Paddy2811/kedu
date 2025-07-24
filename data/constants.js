export const GENDER_OPTIONS = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" }
];

export const STUDENT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending"
};

export const STUDENT_STATUS_OPTIONS = [
  { value: STUDENT_STATUS.ACTIVE, label: "Hoạt động" },
  { value: STUDENT_STATUS.INACTIVE, label: "Không hoạt động" },
  { value: STUDENT_STATUS.PENDING, label: "Chờ xử lý" }
];

// Labels for Student Detail Page
export const STUDENT_DETAIL_LABELS = {
  PERSONAL_INFO: "Thông tin cá nhân",
  CONTACT_INFO: "Thông tin liên hệ",
  NOTES_COMMENTS: "Ghi chú & Nhận xét",
  STUDENT_CODE: "Mã học viên",
  PHONE: "SĐT",
  EMAIL: "Email",
  GENDER: "Giới tính",
  DOB: "Ngày sinh",
  EMERGENCY_CONTACT: "Liên hệ khẩn cấp",
  ADDRESS: "Địa chỉ",
  COURSES: "Khóa học",
};

// Common error messages
export const ERROR_MESSAGES = {
  LOAD_STUDENT_ERROR: "Có lỗi xảy ra khi tải thông tin học viên",
  LOAD_STAFF_ERROR: "Có lỗi xảy ra khi tải thông tin nhân viên",
  LOAD_COURSE_LIST_ERROR: "Có lỗi xảy ra khi tải danh sách khóa học",
  LOAD_COURSE_DETAIL_ERROR: "Có lỗi xảy ra khi tải thông tin khoá học",
  DELETE_STAFF_ERROR: "Có lỗi xảy ra khi xóa nhân viên",
  DELETE_COURSE_ERROR: "Có lỗi xảy ra khi xóa khóa học",
  LOAD_STAFF_LIST_ERROR: "Có lỗi xảy ra khi tải danh sách nhân viên",
  CREATE_FACILITY_ERROR: "Có lỗi xảy ra khi tạo cơ sở",
  UPDATE_FACILITY_ERROR: "Có lỗi xảy ra khi cập nhật cơ sở",
  LOAD_FACILITY_ERROR: "Có lỗi xảy ra khi lấy thông tin cơ sở",
  GENERIC_ERROR: "Có lỗi xảy ra",
};

// Default placeholder for empty/disabled text fields
export const EMPTY_PLACEHOLDER = "---"; 