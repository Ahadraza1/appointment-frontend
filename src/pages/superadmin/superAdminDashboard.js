import React, { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/superAdminService";
import "./superAdminDashboard.css";

const SuperAdminDashboard = () => {
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllCompanies();
      const companies = res.data.companies || [];

      const totalCount = companies.length;
      const activeCount = companies.filter(
        (c) => c.status === "active"
      ).length;
      const inactiveCount = companies.filter(
        (c) => c.status === "inactive"
      ).length;

      setTotal(totalCount);
      setActive(activeCount);
      setInactive(inactiveCount);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setError("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sa-error-container">
        <p className="error-text">{error}</p>
        <button onClick={fetchDashboardStats} className="sa-btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="sa-dashboard-container">
      {/* PAGE HEADER */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2 className="sa-page-title-text">Dashboard Overview</h2>
          <p className="sa-page-subtitle">
            Monitor and manage all companies from a single dashboard
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="sa-stats-grid">
        <div className="sa-stat-card">
          <div className="sa-stat-icon" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4 8 4v14"/>
              <path d="M17 21v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V21"/>
            </svg>
          </div>
          <div className="sa-stat-content">
            <div className="sa-stat-label">TOTAL COMPANIES</div>
            <div className="sa-stat-value">{total}</div>
          </div>
        </div>

        <div className="sa-stat-card">
          <div className="sa-stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="sa-stat-content">
            <div className="sa-stat-label">ACTIVE COMPANIES</div>
            <div className="sa-stat-value">{active}</div>
          </div>
        </div>

        <div className="sa-stat-card">
          <div className="sa-stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="sa-stat-content">
            <div className="sa-stat-label">INACTIVE COMPANIES</div>
            <div className="sa-stat-value">{inactive}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
