import React from "react";
import "./superAdminDashboard.css";

const SuperAdminDashboard = () => {
  return (
    <div className="sa-dashboard">
      <h1 className="sa-page-title">Dashboard</h1>

      <div className="sa-card-grid">
        <div className="sa-card">
          <h3>Total Companies</h3>
          <p className="sa-card-number">12</p>
        </div>

        <div className="sa-card">
          <h3>Active Companies</h3>
          <p className="sa-card-number">9</p>
        </div>

        <div className="sa-card">
          <h3>Inactive Companies</h3>
          <p className="sa-card-number">3</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
