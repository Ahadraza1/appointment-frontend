import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  toggleCompanyStatus,
} from "../../services/superAdminService";
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

  if (loading) {
    return <p className="loading-text">Loading companies...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-companies-page">
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
                          <div className="sa-user-avatar">{company.name.charAt(0).toUpperCase()}</div>
                          <div className="sa-user-info">
                             <div className="sa-user-name">{company.name}</div>
                          </div>
                        </div>
                    </td>
                    <td>{company.email}</td>
                    <td>
                      <span
                        className={`sa-status-pill ${
                          company.status === "active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td>
                      <div className="sa-actions-cell">
                        <button
                            className="sa-action-btn"
                            onClick={() => handleToggleStatus(company._id)}
                            title={company.status === "active" ? "Deactivate" : "Activate"}
                        >
                            {company.status === "active" ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            )}
                        </button>
                        <a href={`/superadmin/companies/${company._id}`} className="sa-action-btn" title="View Details">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </a>
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
