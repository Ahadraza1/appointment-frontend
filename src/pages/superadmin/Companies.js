import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  toggleCompanyStatus,
} from "../../services/superAdminService";
import "./Companies.css";

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
    <div className="companies-page">
      <h2 className="page-title">Companies</h2>

      <div className="table-wrapper">
        <table className="companies-table">
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
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        company.status === "active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`status-btn ${
                        company.status === "active"
                          ? "disable"
                          : "enable"
                      }`}
                      onClick={() =>
                        handleToggleStatus(company._id)
                      }
                    >
                      {company.status === "active"
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Companies;
