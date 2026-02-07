import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCompanyServices } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CompanyServices = () => {
  const { id } = useParams(); // companyId
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCompanyServices(id);
      setServices(res.data.services || []);
    } catch (err) {
      console.error("Fetch services error:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [id]);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-page">
      {/* HEADER */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2>Company Services</h2>
          <p className="sa-page-subtitle">
            Services for Company ID: <strong>{id}</strong>
          </p>
        </div>

        <div className="sa-header-actions">
          <Link
            to={`/superadmin/companies/${id}`}
            className="sa-btn-secondary"
          >
            ← Back to Company
          </Link>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="sa-data-card">
        {services.length === 0 ? (
          <p className="sa-empty-state-text">
            No services found for this company
          </p>
        ) : (
          <table className="sa-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>{service.status || "active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompanyServices;
