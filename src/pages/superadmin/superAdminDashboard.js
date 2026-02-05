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
    return <p className="loading-text">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-dashboard">
      <div className="sa-stats-grid">
        <div className="sa-stat-card">
          <div className="sa-stat-icon primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V21"/></svg>
          </div>
          <div className="sa-stat-content">
            <span className="sa-stat-label">Total Companies</span>
            <span className="sa-stat-value">{total}</span>
          </div>
        </div>

        <div className="sa-stat-card">
          <div className="sa-stat-icon success">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
           <div className="sa-stat-content">
            <span className="sa-stat-label">Active Companies</span>
            <span className="sa-stat-value">{active}</span>
          </div>
        </div>

        <div className="sa-stat-card">
          <div className="sa-stat-icon warning">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
           <div className="sa-stat-content">
            <span className="sa-stat-label">Inactive Companies</span>
            <span className="sa-stat-value">{inactive}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
