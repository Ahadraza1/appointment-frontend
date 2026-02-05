import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  toggleCompanyStatus,
} from "../../services/superAdminService";
import { Link } from "react-router-dom";
import "./SuperAdminPages.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllCompanies();
      setCompanies(res.data.companies || []);
    } catch (err) {
      console.error("Fetch companies error:", err);
      setError("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleCompanyStatus(id);
      fetchCompanies(); // refresh list
    } catch (err) {
      console.error("Toggle status error:", err);
      alert("Failed to update company status");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <p className="loading-text">Loading companies...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="sa-companies-page">
      <div className="sa-page-header" style={{ justifyContent: "space-between" }}>
        <h2>Companies</h2>
        <Link to="/superadmin/companies/create" className="sa-btn-primary">
          + Create Company
        </Link>
      </div>

      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          <table className="sa-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-text">
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((company, index) => (
                  <tr key={company._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                          {company.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                          <div className="sa-user-name">{company.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>{company.email}</td>

                    {/* ✅ STATUS TOGGLE */}
                    <td>
                      <button
                        className={`sa-status-pill ${
                          company.status === "active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(company._id)}
                        style={{ cursor: "pointer" }}
                        title="Click to toggle status"
                      >
                        {company.status === "active" ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </td>

                    <td>
                      <div className="sa-actions-cell">
                        <Link
                          to={`/superadmin/companies/${company._id}`}
                          className="sa-action-btn"
                          title="View Details"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Companies;
