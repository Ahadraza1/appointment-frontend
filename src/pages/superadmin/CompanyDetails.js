import React from "react";
import { Link } from "react-router-dom";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  // Dummy data (API baad me plug hogi)
  const company = {
    id: "1",
    name: "ABC Salon",
    email: "abc@gmail.com",
    status: "active",
    stats: {
      admins: 2,
      services: 12,
      appointments: 148,
    },
  };

  return (
    <div className="sa-company-details">
      {/* HEADER */}
      <div className="sa-company-header">
        <div>
          <h1 className="sa-page-title">{company.name}</h1>
          <p className="sa-company-email">{company.email}</p>
        </div>

        <span className={`sa-status ${company.status}`}>
          {company.status}
        </span>
      </div>

      {/* STATS CARDS */}
      <div className="sa-card-grid">
        <div className="sa-card">
          <h3>Total Admins</h3>
          <p className="sa-card-number">
            {company.stats.admins}
          </p>
        </div>

        <div className="sa-card">
          <h3>Total Services</h3>
          <p className="sa-card-number">
            {company.stats.services}
          </p>
        </div>

        <div className="sa-card">
          <h3>Total Appointments</h3>
          <p className="sa-card-number">
            {company.stats.appointments}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="sa-company-actions">
        <Link
          to={`/superadmin/companies/${company.id}/admins`}
          className="sa-btn view"
        >
          View Admins
        </Link>

        <button className="sa-btn disable">
          Disable Company
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
