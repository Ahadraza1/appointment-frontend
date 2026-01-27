import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, appointmentsAPI } from '../../services/api';
import './Dashboard.css';

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
        appointmentsAPI.getToday().catch(() => []),
      ]);
      setStats(dashboardData);
      setTodayAppointments(Array.isArray(todayData) ? todayData : []);
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Customers</p>
            <p className="stat-value">{stats.totalCustomers}</p>
            <span className="stat-change positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +12%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Appointments</p>
            <p className="stat-value">{stats.totalAppointments}</p>
            <span className="stat-change positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +8%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Services</p>
            <p className="stat-value">{stats.totalServices}</p>
            <span className="stat-change positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +2
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Today's Bookings</p>
            <p className="stat-value">{todayAppointments.length}</p>
            <span className="stat-change positive">Active</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Appointments */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Today's Appointments</h2>
            <Link to="/admin/appointments" className="view-all-link">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="section-content">
            {todayAppointments.length === 0 ? (
              <div className="empty-state" style={{ padding: 'var(--spacing-8)' }}>
                <p className="empty-state-title">No appointments today</p>
                <p className="empty-state-text">New appointments will appear here</p>
              </div>
            ) : (
              todayAppointments.slice(0, 5).map((apt) => (
                <div key={apt._id} className="appointment-item">
                  <div className="appointment-avatar">
                    {getInitials(apt.userId?.name)}
                  </div>
                  <div className="appointment-info">
                    <p className="appointment-name">{apt.userId?.name || 'Customer'}</p>
                    <p className="appointment-service">{apt.serviceId?.name || 'Service'}</p>
                  </div>
                  <div className="appointment-time">
                    <p className="appointment-time-value">{apt.timeSlot}</p>
                    <span className={`badge badge-${apt.status === 'approved' ? 'success' : apt.status === 'pending' ? 'warning' : 'neutral'}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="section-content">
            <div className="quick-actions">
              <Link to="/admin/appointments" className="quick-action-btn">
                <div className="quick-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span className="quick-action-label">Manage Appointments</span>
              </Link>

              <Link to="/admin/services" className="quick-action-btn">
                <div className="quick-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <span className="quick-action-label">Add Service</span>
              </Link>

              <Link to="/admin/customers" className="quick-action-btn">
                <div className="quick-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                  </svg>
                </div>
                <span className="quick-action-label">View Customers</span>
              </Link>

              <Link to="/admin/availability" className="quick-action-btn">
                <div className="quick-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span className="quick-action-label">Set Availability</span>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
