import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appointmentsAPI } from "../../services/api";
import DatePicker from "../../components/common/DatePicker";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsAPI.getMyAppointments();
      setAppointments(Array.isArray(data) ? data : data.appointments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      setCancellingId(id);
      await appointmentsAPI.cancel(id);
      fetchAppointments();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
    };
  };

  const formatFullDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredAppointments = appointments.filter((apt) => {
    // 1. Status Filter
    let statusMatch = true;
    if (filter === "upcoming")
      statusMatch = ["pending", "approved"].includes(apt.status);
    else if (filter === "past")
      statusMatch = ["rejected", "cancelled", "completed"].includes(apt.status);
    else if (filter !== "all") statusMatch = apt.status === filter;

    // 2. Search Filter
    const searchMatch =
      !searchTerm ||
      apt.serviceId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    // 3. Date Filter
    let dateMatch = true;
    if (dateFilter) {
      const aptDate = new Date(apt.date).toDateString();
      dateMatch = aptDate === dateFilter.toDateString();
    }

    return statusMatch && searchMatch && dateMatch;
  });

  if (loading) {
    return (
      <div className="my-appointments-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-appointments-page">
      {/* 1) PAGE HEADER: Branding & Context */}
      <section className="appointments-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">My Appointments</h1>
            <p className="hero-description">
              Manage your professional service schedule and track appointment
              statuses in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* 2) FILTER & SEARCH TOOLBAR: Control Panel */}
      <div className="appointments-toolbar-wrapper">
        <div className="container">
          <div className="appointments-toolbar">
            <div className="toolbar-search">
              <div className="search-box">
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter by service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="toolbar-date">
              <DatePicker
                selectedDate={dateFilter}
                onDateSelect={setDateFilter}
                placeholder="Filter by date..."
              />
            </div>

            <div className="toolbar-status">
              <div className="status-tabs">
                <button
                  className={`tab-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`tab-btn ${filter === "upcoming" ? "active" : ""}`}
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`tab-btn ${filter === "pending" ? "active" : ""}`}
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </button>
                <button
                  className={`tab-btn ${filter === "rejected" ? "active" : ""}`}
                  onClick={() => setFilter("rejected")}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="appointments-list-wrapper">
        <div className="container">
          {error && (
            <div className="alert alert-error" style={{ marginBottom: "2rem" }}>
              {error}
            </div>
          )}

          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                </svg>
              </div>
              <h3 className="empty-state-title">No Appointments Found</h3>
              <p className="empty-state-text">
                {filter === "all"
                  ? "You haven't booked any service units yet. Browse the catalog to start scheduling."
                  : `No records found matching the "${filter}" criteria.`}
              </p>
              <Link to="/services" className="btn-primary-action">
                Browse Services catalog
              </Link>
            </div>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.map((appointment) => {
                const dateParts = formatDate(appointment.date);
                return (
                  <div
                    key={appointment._id}
                    className={`appointment-card ${appointment.status}`}
                  >
                    {/* Date Block */}
                    <div className="card-date-block">
                      <span className="day">{dateParts.day}</span>
                      <span className="month">{dateParts.month}</span>
                    </div>

                    {/* Details Section */}
                    <div className="card-details">
                      <div className="service-main">
                        <h3 className="service-name">
                          {appointment.serviceId?.name || "Service"}
                        </h3>
                        <div className="service-specs">
                          <span className="spec-item">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {appointment.timeSlot}
                          </span>
                          <span className="spec-item">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2v10l4.5 4.5" />
                            </svg>
                            {appointment.serviceId?.duration || 0} min
                          </span>
                          <span className="spec-item price">
                            ${appointment.serviceId?.price || 0}
                          </span>
                        </div>
                      </div>

                      {appointment.status === "rejected" &&
                        appointment.rejectionReason && (
                          <div className="rejection-note">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>Reason: {appointment.rejectionReason}</span>
                          </div>
                        )}
                    </div>

                    {/* Status & Actions */}
                    <div className="card-actions-wrapper">
                      <span className={`status-pill ${appointment.status}`}>
                        {appointment.status}
                      </span>

                      {["pending", "approved"].includes(appointment.status) && (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(appointment._id)}
                          disabled={cancellingId === appointment._id}
                        >
                          {cancellingId === appointment._id
                            ? "Processing..."
                            : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
