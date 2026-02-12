import axios from "axios";

/**
 * Super Admin API service
 * Safe for live project
 */

// axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
});

// attach token automatically
api.interceptors.request.use((config) => {
  let token = null;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) token = userInfo.token;

  if (!token) token = localStorage.getItem("token");
  if (!token) token = localStorage.getItem("superAdminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= COMPANIES ================= */

// Get all companies
export const getAllCompanies = () => {
  return api.get("/superadmin/companies");
};

// Enable / Disable company
export const toggleCompanyStatus = (companyId) => {
  return api.patch(`/superadmin/company/${companyId}/status`);
};

// ✅ CREATE COMPANY (NEW – SAFE ADDITION)
export const createCompany = (data) => {
  return api.post("/superadmin/company", data);
};

// Delete Company
export const deleteCompany = (companyId) => {
  return api.delete(`/superadmin/company/${companyId}`);
};

/* ================= IMPERSONATE COMPANY ADMIN ================= */

// SuperAdmin login as Company Admin
export const impersonateCompanyAdmin = (companyId) => {
  return api.post("/superadmin/impersonate-company-admin", {
    companyId,
  });
};

/* ================= COMPANY DETAILS ================= */

// Get company stats
export const getCompanyStats = (companyId) => {
  return api.get(`/superadmin/company/${companyId}/stats`);
};

// Get company admins
export const getCompanyAdmins = (companyId) => {
  return api.get(`/superadmin/company/${companyId}/admins`);
};

/* ================= COMPANY ADMINS (ALL COMPANIES) ================= */

// Get all company admins (company-wise)
export const getAllCompanyAdmins = () => {
  return api.get("/superadmin/company-admins");
};

// ================= GET ALL CUSTOMERS (SUPER ADMIN) =================
export const getAllCustomers = () => {
  return api.get("/superadmin/customers");
};

// ================= GET COMPANY SERVICES (SUPER ADMIN) =================
export const getCompanyServices = (companyId) => {
  return api.get(`/superadmin/company/${companyId}/services`);
};

// ================= GET COMPANY CUSTOMERS (SUPER ADMIN) =================
export const getCompanyCustomers = (companyId) => {
  return api.get(`/superadmin/company/${companyId}/customers`);
};

// ================= GET CUSTOMER APPOINTMENTS (SUPER ADMIN) =================
export const getCompanyCustomerAppointments = (companyId, customerId) => {
  return api.get(
    `/superadmin/company/${companyId}/customers/${customerId}/appointments`,
  );
};

// ADD SERVICE (SUPER ADMIN)
export const createService = (companyId, data) => {
  return api.post(`/superadmin/company/${companyId}/services`, data);
};

// EDIT SERVICE (SUPER ADMIN)
export const updateService = (serviceId, data) => {
  return api.put(`/superadmin/services/${serviceId}`, data);
};

/// TOGGLE SERVICE STATUS (SUPER ADMIN)
export const toggleServiceStatus = (serviceId, currentStatus) => {
  const newStatus = currentStatus === "active" ? "inactive" : "active";

  return api.patch(`/superadmin/services/${serviceId}/status`, {
    status: newStatus,
  });
};

// DELETE SERVICE (SUPER ADMIN)
export const deleteService = (serviceId) => {
  return api.delete(`/superadmin/services/${serviceId}`);
};

// ================= UPDATE APPOINTMENT STATUS (SUPER ADMIN) =================
export const updateAppointmentStatus = (
  appointmentId,
  status,
  rejectionReason = "",
) => {
  return api.put(`/superadmin/appointments/${appointmentId}/status`, {
    status,
    rejectionReason,
  });
};

// ================= SUPERADMIN PROFILE =================
export const getSuperAdminProfile = () => {
  return api.get("/superadmin/profile");
};

export const updateSuperAdminProfile = (data) => {
  return api.put("/superadmin/profile", data);
};

export const changeSuperAdminPassword = (data) => {
  return api.put("/superadmin/change-password", data);
};

// ================= SUPERADMIN PROFILE PHOTO =================
export const updateSuperAdminProfilePhoto = (formData) => {
  return api.put("/superadmin/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ================= REMOVE SUPERADMIN PROFILE PHOTO =================
export const removeSuperAdminProfilePhoto = () => {
  return api.put("/superadmin/profile/photo/remove");
};

/* ================= CHANGE COMPANY ADMIN PASSWORD (SUPER ADMIN) ================= */

export const changeCompanyAdminPassword = (adminId, email, newPassword) => {
  return api.put(`/superadmin/company-admins/${adminId}/password`, {
    email,
    newPassword,
  });
};


export default api;
