import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminAPI, appointmentsAPI } from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalServices: 0,
    totalAppointments: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardData, todayData] = await Promise.all([
        adminAPI.getDashboard(),
        appointmentsAPI.getToday().catch(() => null),
      ]);

      setStats(dashboardData);

      // ✅ FIX: normalize today appointment to array
      const appointments = Array.isArray(todayData)
        ? todayData
        : todayData
          ? [todayData]
          : [];

      setTodayAppointments(appointments);
    } catch (err) {
      console.error("Dashboard error:", err);
      setTodayAppointments([]);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Customers</p>
            <p className="stat-value">{stats.totalCustomers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon secondary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Appointments</p>
            <p className="stat-value">{stats.totalAppointments}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Services</p>
            <p className="stat-value">{stats.totalServices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Today's Bookings</p>
            <p className="stat-value">{todayAppointments.length}</p>
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">Today's Appointments</h2>
          <Link to="/admin/appointments" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="section-content">
          {todayAppointments.length === 0 ? (
            <div className="empty-state">
              <p>No appointments today</p>
            </div>
          ) : (
            todayAppointments.slice(0, 5).map((apt) => (
              <div key={apt._id} className="appointment-item">
                <div className="appointment-avatar">
                  {getInitials(apt.userId?.name)}
                </div>
                <div className="appointment-info">
                  <p className="appointment-name">
                    {apt.userId?.name || "Customer"}
                  </p>
                  <p className="appointment-service">
                    {apt.serviceId?.name || "Service"}
                  </p>
                </div>
                <div className="appointment-time">
                  <p>{apt.timeSlot}</p>
                  <span className={`badge badge-${apt.status}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
