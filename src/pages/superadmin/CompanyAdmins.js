import React, { useEffect, useState } from "react";
import { getAllCompanyAdmins } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CompanyAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllCompanyAdmins();
      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error("Company admins error:", err);
      setError("Failed to load company admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  if (loading) return <p className="loading-text">Loading admins...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="sa-company-admins">
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          <table className="sa-data-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Email</th>
                <th>Admin Name</th>
                <th>Admin Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-text">
                    No company admins found
                  </td>
                </tr>
              ) : (
                admins.map((item) => (
                  <tr key={item.adminId}>
                    <td>{item.company?.companyName || "-"}</td>
                    <td>{item.company?.companyEmail || "-"}</td>

                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                          {item.adminName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                          <div className="sa-user-name">
                            {item.adminName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{item.adminEmail}</td>

                    <td>
                      <button
                        className="sa-btn-secondary"
                        onClick={() =>
                          alert(
                            "Change password functionality will be added next"
                          )
                        }
                      >
                        Change Password
                      </button>
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

export default CompanyAdmins;
