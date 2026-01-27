const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Get stored auth token
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Make API request with authentication
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.data = data; // Attach full response data (includes error codes)
    error.response = { data }; // Also attach in a common axios-like format
    throw error;
  }

  return data;
};

/* ============================================
   AUTH API
   ============================================ */
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  forgotPassword: (email) =>
    apiRequest("/users/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, password) =>
    apiRequest(`/users/reset-password/${token}`, {
      method: "PUT",
      body: JSON.stringify({ password }),
    }),
};

/* ============================================
   USER API
   ============================================ */
export const userAPI = {
  updateProfile: (data) =>
    apiRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updatePassword: (data) =>
    apiRequest("/users/profile/password", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  uploadProfilePhoto: (formData) =>
    apiRequest("/users/profile-photo", {
      method: "PATCH",
      body: formData,
    }),
};

/* ============================================
   SERVICES API
   ============================================ */
export const servicesAPI = {
  // 🔓 CUSTOMER / PUBLIC – only ACTIVE services
  getPublic: () =>
    apiRequest("/services"),

  // 🔐 ADMIN – active / inactive / all
  getAdmin: (status) =>
    apiRequest(
      status
        ? `/admin/services?status=${status}`
        : `/admin/services`
    ),

  update: (id, data) =>
    apiRequest(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/services/${id}`, {
      method: "DELETE",
    }),

  toggleStatus: (id) =>
    apiRequest(`/services/${id}/toggle`, {
      method: "PATCH",
    }),

  bulkCreate: (services) =>
    apiRequest("/services/bulk", {
      method: "POST",
      body: JSON.stringify({ services }),
    }),
};

/* ============================================
   APPOINTMENTS API
   ============================================ */
export const appointmentsAPI = {
  // Customer endpoints
  book: (data) =>
    apiRequest("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMyAppointments: () => apiRequest("/appointments/my"),

  getDetails: (id) => apiRequest(`/appointments/${id}`),

  cancel: (id) =>
    apiRequest(`/appointments/${id}/cancel`, {
      method: "PUT",
    }),

  reschedule: (id, data) =>
    apiRequest(`/appointments/${id}/reschedule`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Admin endpoints
  getAll: () => apiRequest("/admin/appointments"),

  getByUser: (userId) => apiRequest(`/admin/appointments?userId=${userId}`),

  getToday: () => apiRequest("/admin/today"),

  updateStatus: (id, data) =>
    apiRequest(`/admin/appointments/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

/* ============================================
   AVAILABILITY API
   ============================================ */
export const availabilityAPI = {
  get: () => apiRequest("/availability"),

  getTimeSlots: (serviceId, date) =>
    apiRequest(`/availability/slots?serviceId=${serviceId}&date=${date}`),

  update: (data) =>
    apiRequest("/admin/availability", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  adminGet: () => apiRequest("/admin/availability"),
};

/* ============================================
   ADMIN API
   ============================================ */
export const adminAPI = {
  getDashboard: () => apiRequest("/admin/dashboard"),
  getCustomers: () => apiRequest("/admin/customers"),
  getServices: () => apiRequest("/admin/services"),
  getSettings: () => apiRequest("/admin/settings"),

  // ✅ FIXED
  getCustomerById: (id) => apiRequest(`/users/${id}`),

  getCustomerAppointments: (id) =>
    apiRequest(`/admin/appointments?userId=${id}`),

  updateSettings: (data) =>
    apiRequest("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

export default apiRequest;
