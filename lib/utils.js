import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date to DD/MM/YYYY
export function formatDateDMY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

// Format date and time to DD/MM/YYYY HH:MM
export function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Format time string to HH:MM (remove seconds)
export function formatTimeHHMM(timeString) {
  if (!timeString) return "";
  // If timeString is already in HH:MM format, return as is
  if (timeString.length === 5 && timeString.includes(':')) {
    return timeString;
  }
  // If timeString is in HH:MM:SS format, extract HH:MM
  if (timeString.length >= 5 && timeString.includes(':')) {
    return timeString.substring(0, 5);
  }
  return timeString;
}

// Format currency with period (.) as thousand separator and append đ symbol
export function formatCurrency(value) {
  // Handle null, undefined or NaN values
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "0đ";
  }
  
  // Ensure we're working with a number
  const numValue = Number(value);
  
  // Format number with period as thousand separator
  const formatted = numValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  // Return without đ symbol if requested
  return formatted + "đ";
}

// Format number with period as thousand separator (without currency symbol)
export function formatNumber(value) {
  // Handle null, undefined or NaN values
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "0";
  }
  
  // Ensure we're working with a number
  const numValue = Number(value);
  
  // Format number with period as thousand separator
  return numValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Chuyển chuỗi yyyy-MM-dd hoặc ISO sang int (timestamp giây)
export function parseDateToInt(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return Math.floor(d.getTime() / 1000);
}

// Chuyển timestamp hoặc ISO string sang yyyy-MM-dd cho input type=date
export function toDateInputValue(value) {
  if (!value) return "";
  let date;
  if (typeof value === "number" || /^\d+$/.test(value)) {
    date = new Date(Number(value) * 1000);
  } else {
    date = new Date(value);
  }
  if (isNaN(date.getTime())) return "";
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Get first two uppercase initials from a full name; returns fallback when name is empty
export function getInitials(name, fallback = "U") {
  if (!name) return fallback;
  return name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || fallback;
}

// Remove Vietnamese accents and convert đ/Đ to d/D for search-friendly comparison
export function normalizeString(str = "") {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}
