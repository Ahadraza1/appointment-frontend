import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllCustomers();
      setCustomers(res.data.customers || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers data");
    } finally {
      setLoading(false);
    }
  };

  // Filtering Logic
  const filteredCustomers = customers.filter((customer) => {
    const planMatch =
      filterPlan === "all" || customer.planType === filterPlan;
    const searchMatch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);
    return planMatch && searchMatch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1); // Reset on filter/search change
  }, [searchTerm, filterPlan]);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="sa-dashboard-container">
      {/* HEADER SECTION */}
      <div className="sa-header-main-card">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <h2 className="sa-page-title-text">All Customers Details</h2>
          </div>
        </div>

        <div className="sa-header-control-grid">
          <div className="sa-search-bar-container sa-search-bar-rounded">
            <svg
              className="sa-search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="sa-header-search-input"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="sa-filter-select-rounded"
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE CARD */}
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          <table className="sa-data-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>#</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="sa-empty-state-row">
                    <p className="sa-empty-state-text">No customers found</p>
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td className="sa-sno-cell">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                          {customer.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                          <div className="sa-user-name">{customer.name}</div>
                          <div className="sa-service-subtext">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.phone || "N/A"}</td>
                    <td>
                      <span className={`sa-status-pill ${customer.planType === 'free' ? 'pending' : 'completed'}`}>
                        {customer.planType}
                      </span>
                    </td>
                    <td>
                      <span className={`sa-status-pill ${customer.subscriptionStatus === 'active' ? 'confirmed' : 'rejected'}`}>
                        {customer.subscriptionStatus}
                      </span>
                    </td>
                    <td>
                      {new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {filteredCustomers.length > itemsPerPage && (
          <div className="sa-pagination-wrapper">
            <div className="sa-pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span>
                {Math.min(currentPage * itemsPerPage, filteredCustomers.length)}
              </span>{" "}
              of <span>{filteredCustomers.length}</span> entries
            </div>
            <div className="sa-pagination-controls-refined">
              <button
                className="sa-pag-btn prev"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>

              <div className="sa-page-numbers">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    totalPages <= 5 ||
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        className={`sa-page-num ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="sa-page-dots">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                className="sa-pag-btn next"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
