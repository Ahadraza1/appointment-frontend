import React, { useState, useEffect } from "react";
import { availabilityAPI } from "../../services/api";
import "./AdminPages.css";
import "./Availability.css";

const DAY_MAP = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const Availability = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    workingDays: [],
    startTime: "09:00",
    endTime: "18:00",
    breaks: [],
    holidays: [],
  });

  const [newHoliday, setNewHoliday] = useState("");

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const data = await availabilityAPI.adminGet();
      const availability = data.availability || {};
      setFormData({
        workingDays: availability.workingDays || [],
        startTime: availability.startTime || "",
        endTime: availability.endTime || "",
        breaks: availability.breaks || [],
        holidays: availability.holidays || [],
        bookingOpen: availability.bookingOpen ?? true,
      });
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleAddBreak = () => {
    setFormData((prev) => ({
      ...prev,
      breaks: [...prev.breaks, { start: "12:00", end: "13:00" }],
    }));
  };

  const handleRemoveBreak = (index) => {
    setFormData((prev) => ({
      ...prev,
      breaks: prev.breaks.filter((_, i) => i !== index),
    }));
  };

  const handleBreakChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      breaks: prev.breaks.map((b, i) =>
        i === index ? { ...b, [field]: value } : b,
      ),
    }));
  };

  const handleAddHoliday = () => {
    if (!newHoliday) return;
    setFormData((prev) => ({
      ...prev,
      holidays: [...prev.holidays, newHoliday],
    }));
    setNewHoliday("");
  };

  const handleRemoveHoliday = (holiday) => {
    setFormData((prev) => ({
      ...prev,
      holidays: prev.holidays.filter((h) => h !== holiday),
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError("");
      await availabilityAPI.update(formData);
      setSuccess("Availability updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading availability...</p>
      </div>
    );
  }

  return (
    <div className="availability-page">
      <div className="page-header">
        <h1>Availability Settings</h1>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {error && <div className="alert alert-error">{error}</div>}

      {/* Working Days */}
      <div className="availability-card">
        <div className="availability-card-header">
          <h2 className="availability-card-title">Working Days</h2>
        </div>
        <div className="availability-card-body">
          <div className="days-grid">
            {Object.keys(DAY_MAP).map((shortDay) => {
              const fullDay = DAY_MAP[shortDay];

              return (
                <button
                  key={shortDay}
                  className={`day-btn ${
                    formData.workingDays.includes(fullDay) ? "active" : ""
                  }`}
                  onClick={() => toggleDay(fullDay)}
                >
                  {shortDay}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="availability-card">
        <div className="availability-card-header">
          <h2 className="availability-card-title">Working Hours</h2>
        </div>
        <div className="availability-card-body">
          <div className="time-row">
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Breaks */}
      <div className="availability-card">
        <div className="availability-card-header">
          <h2 className="availability-card-title">Breaks</h2>
        </div>
        <div className="availability-card-body">
          <div className="breaks-list">
            {formData.breaks.map((breakItem, index) => (
              <div key={index} className="break-item">
                <input
                  type="time"
                  className="form-input"
                  value={breakItem.start}
                  onChange={(e) =>
                    handleBreakChange(index, "start", e.target.value)
                  }
                />
                <span>to</span>
                <input
                  type="time"
                  className="form-input"
                  value={breakItem.end}
                  onChange={(e) =>
                    handleBreakChange(index, "end", e.target.value)
                  }
                />
                <button
                  className="break-remove-btn"
                  onClick={() => handleRemoveBreak(index)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button className="add-break-btn" onClick={handleAddBreak}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Break
          </button>
        </div>
      </div>

      {/* Holidays */}
      <div className="availability-card">
        <div className="availability-card-header">
          <h2 className="availability-card-title">Holidays</h2>
        </div>
        <div className="availability-card-body">
          <div className="holidays-list">
            {formData.holidays.map((holiday, index) => (
              <div key={index} className="holiday-tag">
                {holiday}
                <button
                  className="holiday-remove"
                  onClick={() => handleRemoveHoliday(holiday)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="holiday-input-row">
            <input
              type="date"
              className="form-input"
              value={newHoliday}
              onChange={(e) => setNewHoliday(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={handleAddHoliday}>
              Add Holiday
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="availability-actions">
        <button
          className="btn btn-primary btn-rounded"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Availability;
