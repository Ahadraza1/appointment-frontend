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
    <div className="sa-company-details">
      <div className="sa-page-header">
        <div>
          <h2>Create Company</h2>
          <p className="sa-page-subtitle">
            Company and its Admin will be created by SuperAdmin
          </p>
        </div>
      </div>

      <form className="sa-form-card" onSubmit={handleSubmit}>
        {error && <p className="error-text">{error}</p>}

        {/* ================= COMPANY DETAILS ================= */}

        <div className="sa-form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
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
            required
          />
        </div>

        {/* ================= ADMIN DETAILS ================= */}

        <div className="sa-form-divider">Company Admin Details</div>

        <div className="sa-form-group">
          <label>Admin Name</label>
          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
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
            required
          />
        </div>

        <div className="sa-btn-group">
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
  );
};

export default CreateCompany;
