import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createService } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CreateService = () => {
  const { companyId } = useParams(); // companyId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.duration || !formData.price) {
      return setError("Name, duration and price are required");
    }

    try {
      setLoading(true);
      await createService(companyId,{
        ...formData,
        duration: Number(formData.duration),
        price: Number(formData.price),
      });

      navigate(`/superadmin/companies/${companyId}/services`);
    } catch (err) {
      console.error("Create service error:", err);
      setError("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-page">
      <div className="sa-form-card">
        <h2 className="sa-page-title-text">Add Service</h2>

        {error && <p className="sa-error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="sa-form">
          <div className="sa-form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Hair Cut"
            />
          </div>

          <div className="sa-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
            />
          </div>

          <div className="sa-form-row">
            <div className="sa-form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="sa-form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sa-form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="sa-form-actions">
            <button
              type="button"
              className="sa-btn-secondary"
              onClick={() =>
                navigate(`/superadmin/companies/${companyId}/services`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="sa-btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
