import React, { useEffect, useState } from "react";
import { getAllCompanyAdmins } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CompanyAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI States (Search, Pagination)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search change
  }, [searchTerm]);

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

  // Filtering Logic
  const filteredAdmins = admins.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.adminName?.toLowerCase().includes(term) ||
      item.adminEmail?.toLowerCase().includes(term) ||
      item.company?.companyName?.toLowerCase().includes(term)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading admins...</p>
      </div>
    );
  }

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="sa-company-admins">
      {/* PAGE HEADER: Title + Search */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2>Company Admins</h2>
          <div className="sa-search-bar-container sa-search-bar-rounded">
            <svg className="sa-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="sa-header-search-input"
              placeholder="Search by admin name, email or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

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
              {paginatedAdmins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="sa-empty-state-row">
                    <p className="sa-empty-state-text">No company admins found</p>
                  </td>
                </tr>
              ) : (
                paginatedAdmins.map((item) => (
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

        {/* PAGINATION CONTROLS */}
        {filteredAdmins.length > 0 && (
          <div className="sa-pagination-wrapper">
            <div className="sa-pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to <span>{Math.min(currentPage * itemsPerPage, filteredAdmins.length)}</span> of <span>{filteredAdmins.length}</span> entries
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

export default CompanyAdmins;
