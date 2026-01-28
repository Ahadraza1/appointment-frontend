import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import './AdminPages.css';
import './Settings.css';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [settings, setSettings] = useState({
    businessName: '',
    businessAddress: '',
    contactEmail: '',
    contactPhone: '',
    notifications: {
      emailOnBooking: true,
      emailOnApproval: true,
      emailOnCancellation: false,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getSettings();
      const s = data.settings || {};

      setSettings({
        businessName: s.businessName || '',
        businessAddress: s.businessAddress || '',
        contactEmail: s.contactEmail || '',
        contactPhone: s.contactPhone || '',
        notifications: s.notifications || {
          emailOnBooking: true,
          emailOnApproval: true,
          emailOnCancellation: false,
        },
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');
      await adminAPI.updateSettings(settings);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: 'var(--spacing-4)' }}>
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 'var(--spacing-4)' }}>
          {error}
        </div>
      )}

      {/* Business Information */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Business Information</h2>
          <p className="settings-card-description">Basic information about your business</p>
        </div>
        <div className="settings-card-body">
          <div className="settings-grid">
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-input"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                placeholder="Your Business Name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="tel"
                className="form-input"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input
              type="email"
              className="form-input"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              placeholder="contact@yourbusiness.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Business Address</label>
            <textarea
              className="form-input"
              rows="2"
              value={settings.businessAddress}
              onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              placeholder="123 Business St, City, State 12345"
            />
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Email Notifications</h2>
          <p className="settings-card-description">Configure when to send email notifications</p>
        </div>
        <div className="settings-card-body">
          <div className="toggle-row">
            <div className="toggle-info">
              <p className="toggle-label">New Booking Notification</p>
              <p className="toggle-description">Receive an email when a new appointment is booked</p>
            </div>
            <button
              className={`toggle-switch ${settings.notifications.emailOnBooking ? 'active' : ''}`}
              onClick={() => handleNotificationToggle('emailOnBooking')}
            />
          </div>

          <div className="toggle-row">
            <div className="toggle-info">
              <p className="toggle-label">Approval Notification</p>
              <p className="toggle-description">Send email to customer when appointment is approved</p>
            </div>
            <button
              className={`toggle-switch ${settings.notifications.emailOnApproval ? 'active' : ''}`}
              onClick={() => handleNotificationToggle('emailOnApproval')}
            />
          </div>

          <div className="toggle-row">
            <div className="toggle-info">
              <p className="toggle-label">Cancellation Notification</p>
              <p className="toggle-description">Send email when an appointment is cancelled</p>
            </div>
            <button
              className={`toggle-switch ${settings.notifications.emailOnCancellation ? 'active' : ''}`}
              onClick={() => handleNotificationToggle('emailOnCancellation')}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn btn-primary btn-rounded" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

    </div>
  );
};

export default Settings;
