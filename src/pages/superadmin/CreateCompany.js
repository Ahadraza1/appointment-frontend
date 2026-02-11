import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../services/superAdminService";
import { superAdminCreatedCompanyAdmin } from "../../services/bookingEmailAction";
import "./SuperAdminPages.css";

const CreateCompany = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword,
        adminPhone: formData.adminPhone,
      };

      await createCompany(payload);

      // 🔥 SEND EMAIL TO COMPANY ADMIN
      await superAdminCreatedCompanyAdmin({
        companyEmail: formData.companyEmail,
        adminEmail: formData.adminEmail,
        tempPassword: formData.adminPassword,
        companyName: formData.companyName,
      });

      toast.success("Company created and admin notified successfully");
      navigate("/superadmin/companies");
    } catch (err) {
      console.error("Create company error:", err);
      const errMsg = err?.response?.data?.message || "Failed to create company";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-page">
      <div className="sa-form-card">
        {/* HEADER */}
        <div className="sa-form-header">
          <h2 className="sa-page-title-text">Create Company</h2>
          <p className="sa-form-subtitle">
            Register a new company and assign an administrator
          </p>
        </div>

        <form onSubmit={handleSubmit} className="sa-form">
          {/* SECTION 1: COMPANY INFO */}
          <div className="sa-section-header">Company Information</div>

          <div className="sa-form-row">
            <div className="sa-form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                required
              />
            </div>

            <div className="sa-form-group">
              <label>Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="contact@acmecorp.com"
                required
              />
            </div>
          </div>

          {/* SECTION 2: ADMIN DETAILS */}
          <div className="sa-section-header">Admin Details</div>

          <div className="sa-form-row">
            <div className="sa-form-group">
              <label>Admin Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="sa-form-group">
              <label>Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                placeholder="admin@acmecorp.com"
                required
              />
            </div>
          </div>

          <div className="sa-form-row">
            <div className="sa-form-group">
              <label>Admin Password</label>
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="sa-form-group">
              <label>Admin Phone</label>
              <input
                type="tel"
                name="adminPhone"
                value={formData.adminPhone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                required
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="sa-form-actions">
            <button
              type="button"
              className="sa-btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="sa-btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
