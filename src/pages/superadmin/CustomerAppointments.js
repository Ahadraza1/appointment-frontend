import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, dateFilter, statusFilter]);

  // Filtering Logic
  const filteredAppointments = appointments.filter((appt) => {
    // Search filter
    const searchMatch = searchTerm === "" || 
      (appt.serviceId?.name || "").toLowerCase().includes(searchTerm.toLowerCase());

    // Date filter
    const dateMatch = dateFilter === "" || 
      (appt.date && new Date(appt.date).toISOString().split('T')[0] === dateFilter);

    // Status filter
    const statusMatch = statusFilter === "all" || 
      (appt.status || "pending") === statusFilter;

    return searchMatch && dateMatch && statusMatch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
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
      {/* BREADCRUMBS & NAV */}
      <div className="sa-breadcrumb-nav">
        <div className="sa-breadcrumbs">
          <Link to="/superadmin/dashboard">Dashboard</Link>
          <span className="separator">/</span>
          <Link to="/superadmin/companies">Companies</Link>
          <span className="separator">/</span>
          <Link to={`/superadmin/companies/${companyId}`}>Details</Link>
          <span className="separator">/</span>
          <span className="current">Appointments</span>
        </div>
        <button
          className="sa-back-link"
          onClick={() => navigate(`/superadmin/companies/${companyId}/customers`)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Customers
        </button>
      </div>

      {/* MASTER HEADER CARD */}
      <div className="sa-header-main-card">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <h2 className="sa-page-title-text">Customer Appointments</h2>
            <p className="sa-page-subtitle">
              Viewing appointment history and details for selected customer
            </p>
          </div>
        </div>
      </div>

      {/* STATS SUMMARY CARDS */}
      {appointments.length > 0 && (
        <div className="sa-stats-grid">
          <div className="sa-stat-card accent-purple">
            <div className="sa-stat-icon purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <div className="sa-stat-label">Total Appointments</div>
              <div className="sa-stat-value">{appointments.length}</div>
            </div>
          </div>

          <div className="sa-stat-card accent-orange">
            <div className="sa-stat-icon orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <div className="sa-stat-label">Pending</div>
              <div className="sa-stat-value">
                {appointments.filter(a => a.status === 'pending').length}
              </div>
            </div>
          </div>

          <div className="sa-stat-card accent-green">
            <div className="sa-stat-icon green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="sa-stat-content">
              <div className="sa-stat-label">Approved</div>
              <div className="sa-stat-value">
                {appointments.filter(a => a.status === 'approved').length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER BAR */}
      <div className="sa-filter-bar">
        <div className="sa-filter-search-wrapper">
          <svg className="sa-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="sa-filter-search-input"
            placeholder="Search by service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sa-filter-controls">
          <div className="sa-filter-date-wrapper">
            {/* Added class for icon if needed in CSS, kept inline for safety */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <input
              type="date"
              className="sa-filter-date-input"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <select
            className="sa-filter-status-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          {(searchTerm || dateFilter || statusFilter !== "all") && (
            <button
              className="sa-filter-clear-btn"
              onClick={() => {
                setSearchTerm("");
                setDateFilter("");
                setStatusFilter("all");
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* INTEGRATED DATA CARD */}
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          {appointments.length === 0 ? (
            <div className="sa-empty-state-row" style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ background: '#f1f5f9', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="sa-empty-state-text" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                No appointments found
              </p>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem', maxWidth: '400px', margin: '0.5rem auto 0' }}>
                This customer hasn't booked any appointments yet, or no appointments match your filters.
              </p>
            </div>
          ) : (
            <table className="sa-data-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>SERVICE DETAILS</th>
                  <th>APPOINTMENT DATE</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAppointments.map((appt, index) => (
                  <tr key={appt._id}>
                    <td className="sa-sno-cell">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td>
                      <div className="sa-service-cell">
                        <span className="sa-service-name-text">
                          {appt.serviceId?.name || "Service Unavailable"}
                        </span>
                        <span className="sa-service-subtext">
                          {appt.serviceId?.duration || 30} minutes session
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>
                          {appt.date ? new Date(appt.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : "—"}
                        </span>
                        {appt.time && (
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            {appt.time}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="sa-price-text">
                      ${Number(appt.serviceId?.price || 0).toFixed(2)}
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
        {filteredAppointments.length > 0 && (
          <div className="sa-pagination-wrapper">
            <div className="sa-pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to <span>{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span> of <span>{filteredAppointments.length}</span> entries
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
