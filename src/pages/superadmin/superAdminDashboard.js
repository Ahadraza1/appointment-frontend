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
      <h1 className="sa-page-title">Dashboard</h1>

      <div className="sa-card-grid">
        <div className="sa-card">
          <h3>Total Companies</h3>
          <p className="sa-card-number">{total}</p>
        </div>

        <div className="sa-card">
          <h3>Active Companies</h3>
          <p className="sa-card-number">{active}</p>
        </div>

        <div className="sa-card">
          <h3>Inactive Companies</h3>
          <p className="sa-card-number">{inactive}</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
