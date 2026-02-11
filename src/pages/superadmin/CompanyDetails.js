import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCompanyStats } from "../../services/superAdminService";
import "./SuperAdminPages.css";
import "./superAdminDashboard.css";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      toast.error("Failed to load company stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyStats();
  }, [id]);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading company details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sa-error-container">
        <p className="error-text">{error}</p>
        <button onClick={fetchCompanyStats} className="sa-btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="sa-company-details-page">
      <div className="sa-company-details-scroll">
        {/* Breadcrumbs & Back Button */}
        <div className="sa-breadcrumb-nav">
          <div className="sa-breadcrumbs">
            <Link to="/superadmin/dashboard">Dashboard</Link>
            <span className="separator">/</span>
            <Link to="/superadmin/companies">Companies</Link>
            <span className="separator">/</span>
            <span className="current">Details</span>
          </div>
          <button
            className="sa-back-link"
            onClick={() => navigate("/superadmin/companies")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Companies
          </button>
        </div>

        <div className="sa-page-header">
          <div className="sa-header-title-section">
            <h2>Overview</h2>
            <span className="sa-id-badge">ID: {id}</span>
          </div>
          <div className="sa-header-actions">
            <span className="sa-status-pill active">
              <span className="dot"></span>
              Active
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="sa-stats-grid">
          <div className="sa-stat-card">
            <div className="sa-stat-icon primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <span className="sa-stat-label">Total Admins</span>
              <span className="sa-stat-value">{stats.admins}</span>
            </div>
          </div>

          <div className="sa-stat-card">
            <div className="sa-stat-icon secondary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <span className="sa-stat-label">Total Services</span>
              <span className="sa-stat-value">{stats.services}</span>
            </div>
          </div>

          <div className="sa-stat-card">
            <div className="sa-stat-icon success">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <span className="sa-stat-label">Appointments</span>
              <span className="sa-stat-value">{stats.appointments}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions / Management Section */}
        <div className="sa-management-section">
          <h3 className="section-title">Management Actions</h3>
          <div className="sa-action-grid">
            <Link
              to={`/superadmin/companies/${id}/admins`}
              className="sa-action-card"
            >
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="action-info">
                <h4>Manage Company Admins</h4>
                <p>
                  View, add, or remove administrative users for this company.
                </p>
              </div>
              <div className="action-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>

            {/* Placeholder for future actions */}
            <Link
              to={`/superadmin/companies/${id}/services`}
              className="sa-action-card"
            >
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>

              <div className="action-info">
                <h4>Company Services</h4>
                <p>View and manage services provided by this company.</p>
              </div>

              <div className="action-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>

            <Link
              to={`/superadmin/companies/${id}/customers`}
              className="sa-action-card"
            >
              <div className="action-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <div className="action-info">
                <h4>Company Customers</h4>
                <p>View customers registered under this company.</p>
              </div>

              <div className="action-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
