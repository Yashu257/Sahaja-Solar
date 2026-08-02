/**
 * API Configuration
 * Manages backend URL for different environments
 */

// Get API base URL based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// API endpoints
export const API_ENDPOINTS = {
  quotes: `${API_BASE_URL}/api/quotes`,
  bookings: `${API_BASE_URL}/api/bookings`,
  availability: `${API_BASE_URL}/api/bookings/availability`,
  chat: `${API_BASE_URL}/api/chat`,
  admin: {
    login: `${API_BASE_URL}/api/admin/login`,
    leads: `${API_BASE_URL}/api/admin/leads`,
    bookings: `${API_BASE_URL}/api/admin/bookings`,
    dashboard: `${API_BASE_URL}/api/admin/dashboard`,
    availability: `${API_BASE_URL}/api/admin/availability`,
  },
};
