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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination Logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="sa-dashboard-container">
      {/* MASTER UNIFIED HEADER */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2 className="sa-page-title-text">Customer Appointments</h2>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Customers
          </button>
        </div>
      </div>

      {/* INTEGRATED DATA CARD */}
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          {appointments.length === 0 ? (
            <div className="sa-empty-state-row" style={{ padding: '3rem', textAlign: 'center' }}>
              <p className="sa-empty-state-text">
                No appointments found for this customer.
              </p>
            </div>
          ) : (
            <table className="sa-data-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAppointments.map((appt, index) => (
                  <tr key={appt._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{appt.serviceId?.name || "—"}</td>
                    <td className="sa-price-text">
                      ${Number(appt.serviceId?.price || 0).toFixed(2)}
                    </td>
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

        {/* PAGINATION CONTROLS */}
        {appointments.length > 0 && (
          <div className="sa-pagination-wrapper">
            <div className="sa-pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to <span>{Math.min(currentPage * itemsPerPage, appointments.length)}</span> of <span>{appointments.length}</span> entries
            </div>
            <div className="sa-pagination-controls-refined">
              <button 
                className="sa-pag-btn prev"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>
              
              <div className="sa-page-numbers">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button 
                        key={pageNum}
                        className={`sa-page-num ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="sa-page-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                className="sa-pag-btn next"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAppointments;
