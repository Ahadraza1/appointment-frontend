import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CreateCompany = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    services: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const availableServices = [
    "Hair Cut",
    "Spa",
    "Consultation",
    "Therapy",
    "Repair",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createCompany(formData);
      navigate("/superadmin/companies");
    } catch (err) {
      console.error("Create company error:", err);
      setError("Failed to create company");
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
            Fill company details to register a new company
          </p>
        </div>
      </div>

      <form className="sa-form-card" onSubmit={handleSubmit}>
        {error && <p className="error-text">{error}</p>}

        <div className="sa-form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sa-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sa-form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sa-form-group">
          <label>Services</label>
          <div className="sa-checkbox-group">
            {availableServices.map((service) => (
              <label key={service} className="sa-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                />
                {service}
              </label>
            ))}
          </div>
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
