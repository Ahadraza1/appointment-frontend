import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyAdmins } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CompanyAdmins = () => {
  const { id } = useParams();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCompanyAdmins(id);
      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error("Company admins error:", err);
      setError("Failed to load company admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [id]);

  if (loading) return <p className="loading-text">Loading admins...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="sa-company-admins">
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          <table className="sa-data-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Admin Email</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-text">
                    No admins found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                          {admin.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                          <div className="sa-user-name">{admin.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>{admin.email}</td>

                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>

                    {/* 🔐 CHANGE PASSWORD ACTION */}
                    <td>
                      <button
                        className="sa-btn-secondary"
                        onClick={() =>
                          alert(
                            "Change password functionality will be added next",
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
