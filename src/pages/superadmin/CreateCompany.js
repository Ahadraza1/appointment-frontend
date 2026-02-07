import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../services/superAdminService";
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
      navigate("/superadmin/companies");
    } catch (err) {
      console.error("Create company error:", err);
      setError(err?.response?.data?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-create-company">
      {/* HEADER */}
      <div className="sa-page-header">
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: 0,
            }}
          >
            Create Company
          </h2>
          <p className="sa-page-subtitle">
            Register a new company and assign an administrator
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <form className="sa-form-card" onSubmit={handleSubmit}>
        {error && (
          <div
            className="alert alert-error"
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        {/* SECTION 1: COMPANY INFO */}
        <div className="sa-form-divider" style={{ marginTop: 0 }}>
          Company Information
        </div>

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

        {/* SECTION 2: ADMIN DETAILS */}
        <div className="sa-form-divider">Admin Details</div>

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

        {/* ACTIONS */}
        <div className="sa-btn-group">
          <button
            type="button"
            className="sa-btn-secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="sa-btn-primary"
            disabled={loading}
            style={{ minWidth: "140px" }}
          >
            {loading ? "Creating..." : "Create Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
