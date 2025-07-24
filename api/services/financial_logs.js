/**
 * Enum for payment methods
 * @readonly
 * @enum {string}
 */
export const PaymentMethod = Object.freeze({
  CASH: "CASH",
  BANK_TRANSFER: "BANK_TRANSFER"
});

/**
 * Enum for financial log types
 * @readonly
 * @enum {string}
 */
export const FinancialLogType = Object.freeze({
  RECEIPT: "RECEIPT", // Phiếu thu
  PAYMENT: "PAYMENT"  // Phiếu chi
});

/**
 * Enum for financial log status
 * @readonly
 * @enum {string}
 */
export const FinancialLogStatus = Object.freeze({
  CONFIRMED: "CONFIRMED",
  PENDING: "PENDING",
  CANCELLED: "CANCELLED"
});

/**
 * Enum for recipient groups
 * @readonly
 * @enum {string}
 */
export const RecipientGroup = Object.freeze({
  STAFF: "STAFF",
  SUPPLIER: "SUPPLIER",
  OTHER: "OTHER"
});

/**
 * Enum for payment types
 * @readonly
 * @enum {string}
 */
export const PaymentType = Object.freeze({
  SALARY: "SALARY",
  RENT: "RENT",
  UTILITIES: "UTILITIES",
  SUPPLIES: "SUPPLIES",
  OTHER: "OTHER"
});

import api from "../config";

/**
 * Create a new financial log
 * @param {Object} data - Financial log data
 * @returns {Promise<Object>} - Created financial log
 */
export const createFinancialLog = async (data) => {
  try {
    const response = await api.post("/financial_logs/", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errMsg = error.response?.data?.message || error.response?.data?.detail;
    if (!errMsg) errMsg = "Có lỗi xảy ra khi tạo phiếu thu/chi";
    return {
      success: false,
      error: errMsg,
    };
  }
};

/**
 * Get financial logs with pagination and search
 * @param {Object} params - Query parameters (page, pagesize, keyword)
 * @returns {Promise<Object>} - Financial logs list response
 */
export const getFinancialLogs = async (params = {}) => {
  try {
    const response = await api.get("/financial_logs/", { params });
    return {
      success: true,
      data: response.data.items || [],
      pagination: {
        currentPage: response.data.page || 1,
        totalPages: response.data.total_pages || 1,
        totalItems: response.data.total || 0,
      },
    };
  } catch (error) {
    let errMsg = error.response?.data?.message || error.response?.data?.detail;
    if (!errMsg) errMsg = "Có lỗi xảy ra khi lấy danh sách phiếu thu/chi";
    return {
      success: false,
      data: [],
      pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
      error: errMsg,
    };
  }
};

/**
 * Get financial log detail by ID
 * @param {string|number} id - Financial log ID
 * @returns {Promise<Object>} - Financial log detail
 */
export const getFinancialLogDetail = async (id) => {
  try {
    const response = await api.get(`/financial_logs/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errMsg = error.response?.data?.message || error.response?.data?.detail;
    if (!errMsg) errMsg = "Có lỗi xảy ra khi lấy chi tiết phiếu thu/chi";
    return {
      success: false,
      error: errMsg,
    };
  }
};

/**
 * Update a financial log (PATCH)
 * @param {string|number} id - Financial log ID
 * @param {Object} data - Fields to update (note, payment_method)
 * @returns {Promise<Object>} - Updated financial log
 */
export const updateFinancialLog = async (id, data) => {
  try {
    const response = await api.patch(`/financial_logs/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errMsg = error.response?.data?.message || error.response?.data?.detail;
    if (!errMsg) errMsg = "Có lỗi xảy ra khi cập nhật phiếu thu/chi";
    return {
      success: false,
      error: errMsg,
    };
  }
};

/**
 * Get status badge style and label for a financial log status
 * @param {string} status - Financial log status
 * @param {function} t - i18n translation function
 * @returns {object} - { variant, className, label }
 */
export function getFinancialLogStatusBadge(status, t) {
  switch (status) {
    case FinancialLogStatus.CONFIRMED:
      return {
        variant: "outline",
        className: "bg-[#ECFDF2] text-[#008A2E] border-transparent",
        label: t("transaction.transaction_status_confirmed", "Đã xác nhận"),
      };
    case FinancialLogStatus.PENDING:
      return {
        variant: "outline",
        className: "bg-[#FFFCF0] text-[#DC7609] border-transparent",
        label: t("transaction.transaction_status_pending", "Chờ xác nhận"),
      };
    case FinancialLogStatus.CANCELLED:
      return {
        variant: "outline",
        className: "bg-[#FFF0F0] text-[#E60000] border-transparent",
        label: t("transaction.transaction_status_cancelled", "Đã huỷ"),
      };
    default:
      return {
        variant: "outline",
        className: "bg-gray-100 text-gray-500 border-transparent",
        label: status,
      };
  }
}

/**
 * Get payment type options for dropdowns
 * @param {function} t - i18n translation function
 * @returns {Array<{id: string, name: string}>}
 */
export function getPaymentTypeOptions(t) {
  return [
    { id: PaymentType.SALARY, name: t("transaction.payment_type_salary", "Lương") },
    { id: PaymentType.RENT, name: t("transaction.payment_type_rent", "Tiền thuê") },
    { id: PaymentType.UTILITIES, name: t("transaction.payment_type_utility", "Tiện ích") },
    { id: PaymentType.SUPPLIES, name: t("transaction.payment_type_supply", "Vật tư") },
    { id: PaymentType.OTHER, name: t("transaction.payment_type_other", "Khác") },
  ];
}

/**
 * Get payment method options for dropdowns
 * @param {function} t - i18n translation function
 * @returns {Array<{id: string, name: string}>}
 */
export function getPaymentMethodOptions(t) {
  return [
    { id: PaymentMethod.CASH, name: t("transaction.payment_method_cash", "Tiền mặt") },
    { id: PaymentMethod.BANK_TRANSFER, name: t("transaction.payment_method_bank_transfer", "Chuyển khoản") },
  ];
}

/**
 * Get recipient group options for dropdowns
 * @param {function} t - i18n translation function
 * @returns {Array<{id: string, name: string}>}
 */
export function getRecipientGroupOptions(t) {
  return [
    { id: RecipientGroup.STAFF, name: t("transaction.receiver_group_staff", "Nhân viên") },
    { id: RecipientGroup.SUPPLIER, name: t("transaction.receiver_group_vendor", "Nhà cung cấp") },
    { id: RecipientGroup.OTHER, name: t("transaction.receiver_group_other", "Khác") },
  ];
} 