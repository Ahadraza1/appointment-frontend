import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCompanyServices,
  toggleServiceStatus,
  deleteService,
} from "../../services/superAdminService";
import "./SuperAdminPages.css";
import "./CompanyServices.css";

const CompanyServices = () => {
  const { id } = useParams(); // companyId
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCompanyServices(id);
      setServices(res.data.services || []);
    } catch (err) {
      console.error("Fetch services error:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [id]);

  const handleToggleService = async (serviceId, currentStatus) => {
    try {
      await toggleServiceStatus(serviceId, currentStatus);
      fetchServices();
    } catch (error) {
      console.error("Toggle service error:", error);
      alert("Failed to update service status");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await deleteService(serviceId);
      fetchServices();
    } catch (error) {
      console.error("Delete service error:", error);
      alert("Failed to delete service");
    }
  };

  // Filtering Logic
  const filteredServices = services.filter((service) => {
    const statusMatch =
      filterStatus === "all" || (service.status || "active") === filterStatus;
    const searchMatch =
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description &&
        service.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return statusMatch && searchMatch;
  });

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sa-page">
        <div className="sa-empty-state">
          <div className="sa-empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="error-text">{error}</p>
          <button
            onClick={fetchServices}
            className="sa-btn-primary sa-btn-rounded"
            style={{ marginTop: "1rem" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sa-services-container">
      {/* IMPROVED RESPONSIVE HEADER SECTION */}
      <div className="sa-services-header-responsive">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <button
              className="sa-back-btn-circle"
              onClick={() => navigate(`/superadmin/companies/${id}`)}
              title="Back to Company"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <h2 className="sa-page-title-text">Services</h2>
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
              placeholder="Search by service name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="sa-filter-select sa-filter-select-rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            className="sa-btn-primary sa-btn-rounded sa-add-service-btn"
            onClick={() =>
              navigate(`/superadmin/companies/${id}/services/create`)
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Service
          </button>
        </div>
      </div>

      {/* SERVICES LIST SECTION */}
      <div className="sa-services-table-card">
        {filteredServices.length === 0 ? (
          <div className="sa-empty-state">
            <div className="sa-empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <p className="sa-empty-state-text">
              {searchTerm || filterStatus !== "all"
                ? "No services match your filters"
                : "No services found for this company"}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                className="sa-btn-secondary sa-btn-rounded"
                style={{ marginTop: "1rem" }}
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE (Now with Horizontal Scroll on Mobile) */}
            <div className="sa-table-wrapper">
              <table className="sa-data-table">
                <thead>
                  <tr>
                    <th style={{ width: "80px" }}>S.NO</th>
                    <th>SERVICE</th>
                    <th>DURATION</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((service, index) => (
                    <tr key={service._id}>
                      <td className="sa-sno-cell">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td>
                        <div className="sa-service-cell">
                          <span className="sa-service-name-text">
                            {service.name}
                          </span>
                          <span className="sa-service-subtext">
                            {service.description || service.name.toLowerCase()}
                          </span>
                        </div>
                      </td>
                      <td className="sa-duration-cell">
                        {service.duration || 30} min
                      </td>
                      <td className="sa-price-text">
                        ${Number(service.price).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className={`sa-toggle-switch ${service.status === "active" ? "active" : ""}`}
                          onClick={() =>
                            handleToggleService(
                              service._id,
                              service.status || "active",
                            )
                          }
                          title={service.status === "active" ? "Deactivate" : "Activate"}
                        />
                      </td>
                      <td>
                        <div className="sa-actions-wrapper">
                          <button
                            className="sa-icon-btn sa-edit-btn"
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/superadmin/companies/${id}/services/${service._id}/edit`,
                              )
                            }
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            className="sa-icon-btn sa-delete-btn"
                            title="Delete"
                            onClick={() => handleDeleteService(service._id)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* NEW PAGINATION FOOTER */}
            <div className="sa-pagination-footer">
              <div className="sa-showing-entries">
                Showing <span>{indexOfFirstItem + 1}</span> to{" "}
                <span>
                  {Math.min(indexOfLastItem, filteredServices.length)}
                </span>{" "}
                of <span>{filteredServices.length}</span> entries
              </div>

              <div className="sa-pag-controls">
                <button
                  className="sa-pag-link"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`sa-pag-link ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="sa-pag-link"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyServices;
