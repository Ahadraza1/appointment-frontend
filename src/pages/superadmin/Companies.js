import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllCompanies,
  toggleCompanyStatus,
  deleteCompany,
  impersonateCompanyAdmin,
} from "../../services/superAdminService";
import { Link } from "react-router-dom";
import "./SuperAdminPages.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI States (Search, Filter, Pagination, Delete Modal)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const itemsPerPage = 10;

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

  const handleToggleStatus = async (company) => {
    try {
      await toggleCompanyStatus(company._id);

      toast.success(
        company.status === "active"
          ? "Company deactivated successfully"
          : "Company activated successfully",
      );

      fetchCompanies();
    } catch (err) {
      console.error("Toggle status error:", err);
      toast.error("Failed to update company status");
    }
  };

  const handleOpenAdminPanel = async (companyId) => {
    try {
      const res = await impersonateCompanyAdmin(companyId);
      const { token } = res.data;

      // 🔑 decode JWT
      const payload = JSON.parse(atob(token.split(".")[1]));

      // ✅ REQUIRED by AuthContext
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: payload.id,
          role: "admin", // IMPORTANT
          companyId: payload.companyId,
          impersonatedBy: "superadmin", // for exit button
        }),
      );

      toast.success("Redirected to company admin panel");
     // 🔁 full reload so AuthContext re-inits
      window.location.replace("/admin/dashboard");
    } catch (error) {
      console.error("Impersonation error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to open admin panel",
      );
    }
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;
    try {
      await deleteCompany(companyToDelete._id);
      toast.success("Company deleted successfully");
      fetchCompanies();
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.response?.data?.message || "Failed to delete company");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filtering Logic
  const filteredCompanies = companies.filter((company) => {
    const statusMatch =
      filterStatus === "all" || company.status === filterStatus;
    const searchMatch =
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterStatus]);

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="sa-dashboard-container">
      {/* MASTER RESPONSIVE HEADER SECTION */}
      <div className="sa-header-main-card">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <h2 className="sa-page-title-text">Companies</h2>
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
              placeholder="Search by company name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="sa-filter-select-rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Link to="/superadmin/companies/create" className="sa-btn-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Company
          </Link>
        </div>
      </div>

      {/* DATA TABLE CARD */}
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          <table className="sa-data-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>#</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCompanies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="sa-empty-state-row">
                    <p className="sa-empty-state-text">No companies found</p>
                  </td>
                </tr>
              ) : (
                paginatedCompanies.map((company, index) => (
                  <tr key={company._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                          <div className="sa-user-name">{company.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{company.email}</td>
                    <td>
                      <label className="sa-switch">
                        <input
                          type="checkbox"
                          checked={company.status === "active"}
                          onChange={() => handleToggleStatus(company)}
                        />
                        <span className="sa-slider"></span>
                      </label>
                    </td>

                    <td>
                      <div className="sa-actions-cell">
                        <button
                          className="sa-action-btn"
                          style={{ color: "#6366f1" }}
                          title="Open Admin Panel"
                          onClick={() => handleOpenAdminPanel(company._id)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="18"
                            height="18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="7" height="9" rx="1" />
                            <rect x="14" y="3" width="7" height="5" rx="1" />
                            <rect x="14" y="12" width="7" height="9" rx="1" />
                            <rect x="3" y="16" width="7" height="5" rx="1" />
                          </svg>
                        </button>
                        <Link
                          to={`/superadmin/companies/${company._id}`}
                          className="sa-action-btn view"
                          title="View Details"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="18"
                            height="18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>
                        <button
                          className="sa-action-btn delete"
                          title="Delete Company"
                          onClick={() => handleDeleteClick(company)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="18"
                            height="18"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {filteredCompanies.length > 0 && (
          <div className="sa-pagination-wrapper">
            <div className="sa-pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span>
                {Math.min(currentPage * itemsPerPage, filteredCompanies.length)}
              </span>{" "}
              of <span>{filteredCompanies.length}</span> entries
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

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="sa-modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="sa-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sa-modal-header">
              <h3 className="sa-modal-title">Delete Company</h3>
              <p className="sa-modal-desc">
                Are you sure you want to delete{" "}
                <strong>{companyToDelete?.name}</strong>? This action is
                permanent and cannot be undone.
              </p>
            </div>
            <div className="sa-modal-footer">
              <button
                className="sa-btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="sa-btn-danger" onClick={confirmDelete}>
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
