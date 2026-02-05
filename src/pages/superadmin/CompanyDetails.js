import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCompanyStats } from "../../services/superAdminService";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const { id } = useParams();

  const [stats, setStats] = useState({
    admins: 0,
    services: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanyStats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCompanyStats(id);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Company stats error:", err);
      setError("Failed to load company stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyStats();
  }, [id]);

  if (loading) {
    return <p className="loading-text">Loading company details...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-company-details">
      {/* HEADER (static for now) */}
      <div className="sa-company-header">
        <div>
          <h1 className="sa-page-title">Company Details</h1>
          <p className="sa-company-email">
            Company ID: {id}
          </p>
        </div>

        <span className="sa-status active">active</span>
      </div>

      {/* STATS CARDS */}
      <div className="sa-card-grid">
        <div className="sa-card">
          <h3>Total Admins</h3>
          <p className="sa-card-number">
            {stats.admins}
          </p>
        </div>

        <div className="sa-card">
          <h3>Total Services</h3>
          <p className="sa-card-number">
            {stats.services}
          </p>
        </div>

        <div className="sa-card">
          <h3>Total Appointments</h3>
          <p className="sa-card-number">
            {stats.appointments}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="sa-company-actions">
        <Link
          to={`/superadmin/companies/${id}/admins`}
          className="sa-btn view"
        >
          View Admins
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetails;
