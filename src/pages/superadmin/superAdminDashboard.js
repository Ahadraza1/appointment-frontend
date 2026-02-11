import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCompanies } from "../../services/superAdminService";
import { useNavigate } from "react-router-dom"; // Assuming standard routing for dashboard actions
import "./SuperAdminPages.css"; // MASTER CSS
import "./superAdminDashboard.css"; // SPECIFIC OVERRIDES

const SuperAdminDashboard = () => {
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

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
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="sa-dashboard-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
        <div className="sa-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sa-dashboard-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", gap: "1rem" }}>
        <div className="sa-error-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
        </div>
        <button onClick={fetchDashboardStats} className="sa-btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="sa-dashboard-container">
      
      {/* 1. MASTER HEADER SECTION */}
      <div className="sa-header-main-card">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <h2 className="sa-page-title-text">Dashboard Overview</h2>
            <p className="sa-page-subtitle">
              Monitor key metrics and manage your platform efficiently.
            </p>
          </div>
          {/* Optional: Date or subtle indicator */}
          <div style={{ padding: "0.5rem 1rem", background: "#f1f5f9", borderRadius: "12px", color: "#64748b", fontWeight: "600", fontSize: "0.85rem" }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* 2. PREMIUM STATS GRID */}
      <div className="sa-stats-grid">
        
        {/* TOTAL COMPANIES */}
        <div className="sa-dashboard-stat-card" style={{ borderLeft: "5px solid #6366f1" }}>
          <div className="sa-stat-icon-large" style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", color: "#4f46e5" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div className="sa-stat-content-large">
             <span className="sa-stat-value-large">{total}</span>
             <span className="sa-stat-label-large">Total Companies</span>
          </div>
        </div>

        {/* ACTIVE COMPANIES */}
        <div className="sa-dashboard-stat-card" style={{ borderLeft: "5px solid #10b981" }}>
          <div className="sa-stat-icon-large" style={{ background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)", color: "#059669" }}>
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="sa-stat-content-large">
             <span className="sa-stat-value-large">{active}</span>
             <span className="sa-stat-label-large">Active Companies</span>
          </div>
        </div>

        {/* INACTIVE COMPANIES */}
        <div className="sa-dashboard-stat-card" style={{ borderLeft: "5px solid #f59e0b" }}>
          <div className="sa-stat-icon-large" style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", color: "#d97706" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="sa-stat-content-large">
             <span className="sa-stat-value-large">{inactive}</span>
             <span className="sa-stat-label-large">Inactive Companies</span>
          </div>
        </div>

      </div>

      {/* 3. QUICK ACTIONS (Visual Only - Enhancement) */}
      <div style={{ marginTop: "3rem" }}>
        <h3 className="sa-dashboard-section-title">Quick Actions</h3>
        
        <div className="sa-quick-actions-grid">
            {/* Manage Companies */}
            <div className="sa-action-card" onClick={() => navigate('/superadmin/companies')}>
                <div className="sa-action-icon sa-icon-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18"/>
                        <path d="M5 21V7l8-4 8 4v14"/>
                        <path d="M17 21v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V21"/>
                    </svg>
                </div>
                <h4 className="sa-action-title">Manage Companies</h4>
            </div>

            {/* Add New Company */}
            <div className="sa-action-card" onClick={() => navigate('/superadmin/companies/create')}>
                <div className="sa-action-icon sa-icon-green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                <h4 className="sa-action-title">Add New Company</h4>
            </div>

            {/* My Profile */}
            <div className="sa-action-card" onClick={() => navigate('/superadmin/settings')}>
                <div className="sa-action-icon sa-icon-purple">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                       <circle cx="12" cy="7" r="4"></circle>
                   </svg>
                </div>
                <h4 className="sa-action-title">My Profile</h4>
            </div>
            
            {/* System Logs (Disabled) */}
            <div className="sa-action-card disabled">
                <div className="sa-action-icon sa-icon-gray">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <circle cx="12" cy="12" r="10"></circle>
                       <line x1="12" y1="16" x2="12" y2="12"></line>
                       <line x1="12" y1="8" x2="12.01" y2="8"></line>
                   </svg>
                </div>
                <h4 className="sa-action-title">System Logs (Soon)</h4>
            </div>
        </div>
      </div>

    </div>
  );
};

export default SuperAdminDashboard;
