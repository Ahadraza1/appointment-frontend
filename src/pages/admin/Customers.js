import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminPages.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getCustomers();
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm),
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="admin-customers">
      <div className="page-header">
        <div className="header-title-section">
          <h1>Customers</h1>
          <div className="search-bar-container search-bar-rounded">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="header-search-input"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>S.No</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state-row">
                  <p className="empty-state-text">No customers found</p>
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {getInitials(customer.name)}
                      </div>
                      <div className="user-info">
                        <span className="user-name">{customer.name}</span>
                        <span className="user-email">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{customer.phone || "N/A"}</td>
                  <td>{formatDate(customer.createdAt)}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="action-btn"
                        title="View Appointments"
                        onClick={() =>
                          navigate(
                            `/admin/customers/${customer._id}/appointments`,
                          )
                        }
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Improved Pagination Controls */}
        {filteredCustomers.length > 0 && (
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to <span>{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> of <span>{filteredCustomers.length}</span> entries
            </div>
            <div className="pagination-controls-refined">
              <button 
                className="pag-btn prev"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>
              
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button 
                        key={pageNum}
                        className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="page-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                className="pag-btn next"
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

export default Customers;
