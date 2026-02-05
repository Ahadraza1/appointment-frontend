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


export default api;
