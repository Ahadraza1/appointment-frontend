import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCompanyCustomerAppointments,
} from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CustomerAppointments = () => {
  const { companyId, customerId } = useParams();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCompanyCustomerAppointments(
        companyId,
        customerId
      );

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Fetch customer appointments error:", err);
      setError("Failed to load customer appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [companyId, customerId]);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sa-error-container">
        <p className="error-text">{error}</p>
        <button onClick={fetchAppointments} className="sa-btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="sa-page">
      {/* HEADER */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2>Customer Appointments</h2>
          <p className="sa-page-subtitle">
            Customer ID: <strong>{customerId}</strong>
          </p>
        </div>

        <div className="sa-header-actions">
          <button
            className="sa-btn-secondary"
            onClick={() =>
              navigate(
                `/superadmin/companies/${companyId}/customers`
              )
            }
          >
            ← Back to Customers
          </button>
        </div>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="sa-data-card">
        {appointments.length === 0 ? (
          <p className="sa-empty-state-text">
            No appointments found for this customer.
          </p>
        ) : (
          <table className="sa-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt._id}>
                  <td>{index + 1}</td>
                  <td>{appt.serviceId?.name || "—"}</td>
                  <td>{appt.serviceId?.price || "—"}</td>
                  <td>
                    {appt.date
                      ? new Date(appt.date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`sa-status-pill ${
                        appt.status || "pending"
                      }`}
                    >
                      {appt.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerAppointments;
