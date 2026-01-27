import React, { useState, useEffect } from 'react';
import { appointmentsAPI } from '../../services/api';
import DatePicker from '../../components/common/DatePicker';
import './AdminPages.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search or filters change
  }, [searchTerm, filter, selectedDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, rejectionReason = '') => {
    try {
      setProcessingId(id);
      await appointmentsAPI.updateStatus(id, { status, rejectionReason });
      fetchAppointments();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredAppointments = appointments.filter(apt => {
    // 1. Status Filter
    const statusMatch = filter === 'all' || apt.status === filter;
    
    // 2. Date Filter
    let dateMatch = true;
    if (selectedDate) {
      const aptDate = new Date(apt.date).toDateString();
      dateMatch = aptDate === selectedDate.toDateString();
    }

    // 3. Search Filter
    const customerName = apt.userId?.name || '';
    const searchMatch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (apt.serviceId?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && dateMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="admin-appointments">
      <div className="page-header">
        <div className="header-title-section">
          <h1>Appointments</h1>
          <div className="search-bar-container search-bar-rounded">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search by customer or service..."
              className="header-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="page-header-actions">
          <DatePicker 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            placeholder="Filter by date..."
            className="datepicker-rounded"
          />
          <select 
            className="filter-select filter-select-rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >

            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>
      </div>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>S.No</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state-row">
                  <p className="empty-state-text">No appointments found</p>
                </td>
              </tr>
            ) : (
              paginatedAppointments.map((apt, index) => (
                <tr key={apt._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {getInitials(apt.userId?.name)}
                      </div>
                      <div className="user-info">
                        <span className="user-name">{apt.userId?.name || 'Unknown'}</span>
                        <span className="user-email">{apt.userId?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{apt.serviceId?.name || 'Service'}</td>
                  <td>{formatDate(apt.date)}</td>
                  <td>{apt.timeSlot}</td>
                  <td>
                    <span className={`status-pill ${apt.status}`}>{apt.status}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {(apt.status === 'pending' || apt.status === 'rescheduled') && (
                        <>
                          <button
                            className="action-btn approve"
                            onClick={() => handleStatusUpdate(apt._id, 'approved')}
                            disabled={processingId === apt._id}
                            title="Approve"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </button>
                          <button
                            className="action-btn reject"
                            onClick={() => {
                              const reason = prompt('Rejection reason (optional):');
                              if (reason !== null) handleStatusUpdate(apt._id, 'rejected', reason);
                            }}
                            disabled={processingId === apt._id}
                            title="Reject"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </>
                      )}
                      <button className="action-btn" title="View Details">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
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
        {filteredAppointments.length > 0 && (
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to <span>{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span> of <span>{filteredAppointments.length}</span> entries
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
                  // Basic logic to show limited page numbers if there are many
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

export default Appointments;
