import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { appointmentsAPI } from '../../services/api';
import './AppointmentConfirmation.css';

import SaaSToast from '../../components/common/SaaSToast';

const AppointmentConfirmation = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  useEffect(() => {
    if (appointment) {
      SaaSToast.success({
        title: "Booking Confirmed",
        description: "Your appointment is confirmed. A confirmation email has been sent with the details."
      });
    }
  }, [appointment]);

  const fetchAppointment = async () => {
    try {
      const data = await appointmentsAPI.getDetails(appointmentId);
      setAppointment(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="confirmation-card">
            <div className="alert alert-error">{error}</div>
            <Link to="/services" className="btn btn-primary">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="confirmation-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1 className="confirmation-title">Booking Confirmed!</h1>
            <p className="confirmation-subtitle">
              Your appointment has been successfully scheduled
            </p>
          </div>

          <div className="confirmation-details">
            <div className="detail-row">
              <span className="detail-label">Service</span>
              <span className="detail-value">{appointment?.serviceId?.name || 'Service'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(appointment?.date)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time</span>
              <span className="detail-value">{appointment?.timeSlot}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{appointment?.serviceId?.duration} minutes</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Price</span>
              <span className="detail-value highlight">{formatPrice(appointment?.serviceId?.price || 0)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className={`badge badge-${appointment?.status === 'approved' ? 'success' : 'warning'}`}>
                {appointment?.status?.charAt(0).toUpperCase() + appointment?.status?.slice(1)}
              </span>
            </div>
          </div>



          <div className="confirmation-actions">
            <Link to="/my-appointments" className="btn btn-primary">
              View My Appointments
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Book Another Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
