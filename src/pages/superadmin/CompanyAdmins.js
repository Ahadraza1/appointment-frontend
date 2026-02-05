import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyAdmins } from "../../services/superAdminService";
import "./CompanyAdmins.css";

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

  if (loading) {
    return <p className="loading-text">Loading admins...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-company-admins">
      <h1 className="sa-page-title">Company Admins</h1>

      <div className="sa-table-wrapper">
        <table className="sa-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-text">
                  No admins found
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    {new Date(admin.createdAt).toLocaleDateString()}
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

export default CompanyAdmins;
