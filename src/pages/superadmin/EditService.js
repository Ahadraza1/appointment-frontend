import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateService,
  getCompanyServices,
} from "../../services/superAdminService";
import "./SuperAdminPages.css";

const EditService = () => {
  const { id, serviceId } = useParams(); 
  // id = companyId, serviceId = service _id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    status: "active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch service details (from company services list)
  const fetchService = async () => {
    try {
      setError("");
      const res = await getCompanyServices(id);
      const service = res.data.services.find(
        (s) => s._id === serviceId
      );

      if (!service) {
        setError("Service not found");
        return;
      }

      setFormData({
        name: service.name || "",
        description: service.description || "",
        duration: service.duration || "",
        price: service.price || "",
        status: service.status || "active",
      });
    } catch (err) {
      console.error("Fetch service error:", err);
      setError("Failed to load service details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id, serviceId]);

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
      setSaving(true);
      await updateService(serviceId, {
        ...formData,
        duration: Number(formData.duration),
        price: Number(formData.price),
      });

      navigate(`/superadmin/companies/${id}/services`);
    } catch (err) {
      console.error("Update service error:", err);
      setError("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading service...</p>
      </div>
    );
  }

  return (
    <div className="sa-page">
      <div className="sa-form-card">
        <h2 className="sa-page-title-text">Edit Service</h2>

        {error && <p className="sa-error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="sa-form">
          <div className="sa-form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="sa-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                navigate(`/superadmin/companies/${id}/services`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="sa-btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;
