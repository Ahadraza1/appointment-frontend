import React, { useState, useEffect } from "react";
import { sendCustomerEmail, sendAdminEmail } from "../../utils/email";
import { useParams, useNavigate } from "react-router-dom";
import {
  servicesAPI,
  availabilityAPI,
  appointmentsAPI,
} from "../../services/api";
import DatePicker from "../../components/common/DatePicker";
import SaaSToast from "../../components/common/SaaSToast";
import "./BookAppointment.css";
import { useAuth } from "../../context/AuthContext";

const BookAppointment = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { user } = useAuth();
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  useEffect(() => {
    if (user && user.planType === "free" && !warningShown) {
      const remaining = (user.bookingLimit || 0) - (user.bookingUsed || 0);
      if (remaining === 1) {
        SaaSToast.warning({
          onAction: () => navigate("/pricing"),
        });
        setWarningShown(true);
      }
    }
  }, [user, warningShown, navigate]);

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedDate]);

  const fetchService = async () => {
    try {
      const response = await servicesAPI.getPublic();
      const servicesList = Array.isArray(response)
        ? response
        : response.data || response.services || [];
      const found = servicesList.find((s) => s._id === serviceId);
      if (found) {
        setService(found);
      } else {
        navigate("/services");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      setSlotsLoading(true);
      const dateStr = formatDateForAPI(selectedDate);
      const slots = await availabilityAPI.getTimeSlots(serviceId, dateStr);
      setTimeSlots(
        Array.isArray(slots) ? slots : slots?.data || slots?.slots || [],
      );
    } catch (err) {
      setTimeSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time");
      return;
    }

    try {
      setSubmitting(true);

      const response = await appointmentsAPI.book({
        serviceId,
        date: formatDateForAPI(selectedDate),
        timeSlot: selectedTime,
        notes,
      });

      const res = response?.data || response;

      if (res?.user && typeof updateUser === "function") {
        updateUser(res.user);
      }

      const appointment = res?.appointment || res;

      if (!appointment?._id) {
        throw new Error("Invalid booking response");
      }

      // ✅ BOOKING SUCCESS (PRIMARY)
      navigate(`/confirmation/${appointment._id}`);

      // 🔕 EMAILS (SAFE / NON-BLOCKING)
      // 🔕 EMAILS (SAFE / NON-BLOCKING)
      setTimeout(() => {
        try {
          const customerEmail =
            user?.email || res?.user?.email || appointment?.userId?.email;

          if (!customerEmail) {
            console.warn("Email skipped: customer email missing");
            return;
          }

          const baseEmailData = {
            customer_name: user?.name || res?.user?.name || "Customer",
            customer_email: customerEmail,
            service_name: service?.name,
            booking_date: formatDateForAPI(selectedDate),
            booking_time: selectedTime,
            booking_id: appointment._id,
          };

          Promise.allSettled([
            sendCustomerEmail({
              ...baseEmailData,
              email_title: "Booking Confirmation",
              email_message:
                "Your booking request has been received successfully. We will notify you once it is reviewed.",
            }),
            sendAdminEmail({
              ...baseEmailData,
              notification_title: "New Booking Created",
              notification_message:
                "A new booking has been created by a customer.",
            }),
          ]);
        } catch (emailErr) {
          console.warn("Email failed (ignored):", emailErr);
        }
      }, 0);

      return;
    } catch (err) {
      const errorCode = err?.response?.data?.code;

      if (errorCode === "BOOKING_LIMIT_REACHED") {
        SaaSToast.limitReached({
          onAction: () => navigate("/pricing"),
        });
        return;
      }

      if (
        errorCode === "PLAN_EXPIRED" ||
        errorCode === "SUBSCRIPTION_EXPIRED"
      ) {
        SaaSToast.planExpired({
          onAction: () => navigate("/pricing"),
        });
        return;
      }

      const errorMsg =
        err?.response?.data?.message || err?.message || "Booking failed";

      SaaSToast.error({
        title: "Booking Failed",
        description: errorMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDuration = (minutes) => {
    if (!minutes || isNaN(minutes)) return "Standard";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="booking-page_loading">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Synchronizing Registry...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* 1) HERO SECTION: Service Context */}
      <section className="booking-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">SCHEDULING UNIT</div>
            <h1 className="hero-title">Book Your Appointment</h1>
            <p className="hero-description">
              Secure your professional service slot. Selective scheduling for{" "}
              {service?.name || "requested units"}.
            </p>
          </div>
        </div>
      </section>

      <div className="booking-content-wrapper">
        <div className="container">
          <div className="booking-grid">
            {/* Main Booking Panel */}
            <div className="booking-main-panel">
              {/* Progress Tracker */}
              <div className="booking-tracker">
                <div
                  className={`tracker-step ${selectedDate ? "done" : "active"}`}
                >
                  <div className="step-circle">{selectedDate ? "✓" : "01"}</div>
                  <div className="step-label">Select Date</div>
                </div>
                <div
                  className={`tracker-step ${selectedTime ? "done" : selectedDate ? "active" : ""}`}
                >
                  <div className="step-circle">{selectedTime ? "✓" : "02"}</div>
                  <div className="step-label">Select Time</div>
                </div>
                <div
                  className={`tracker-step ${selectedDate && selectedTime ? "active" : ""}`}
                >
                  <div className="step-circle">03</div>
                  <div className="step-label">Finalize</div>
                </div>
              </div>

              {/* Calendar Section */}
              <div className="booking-section">
                <div className="section-header">
                  <h3 className="section-title">01. Service Registry Date</h3>
                  <p className="section-desc">
                    Select an available operating day from the catalog calendar.
                  </p>
                </div>

                <div style={{ maxWidth: "400px" }}>
                  <DatePicker
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    minDate={today}
                    placeholder="Select deployment date..."
                  />
                </div>
              </div>

              {/* Time Section */}
              {selectedDate && (
                <div className="booking-section">
                  <div className="section-header">
                    <h3 className="section-title">02. Operational Time Slot</h3>
                    <p className="section-desc">
                      Available slots for{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {slotsLoading ? (
                    <div className="slots-loader">
                      <div className="spinner"></div>
                      <span>Retrieving availability...</span>
                    </div>
                  ) : timeSlots.length > 0 ? (
                    <div className="time-grid">
                      {timeSlots.map((slot) => {
                        const timeStr =
                          typeof slot === "string" ? slot : slot.time;
                        const available =
                          typeof slot === "string"
                            ? true
                            : slot.available !== false;
                        return (
                          <button
                            key={timeStr}
                            className={`time-chip ${!available ? "disabled" : selectedTime === timeStr ? "selected" : ""}`}
                            onClick={() =>
                              available && setSelectedTime(timeStr)
                            }
                            disabled={!available}
                          >
                            {timeStr}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-slots">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <p>No operational slots available for this date.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Notes Section */}
              {selectedDate && selectedTime && (
                <div className="booking-section">
                  <div className="section-header">
                    <h3 className="section-title">03. Deployment Notes</h3>
                    <p className="section-desc">
                      Provide any additional technical specifications for this
                      booking.
                    </p>
                  </div>
                  <textarea
                    className="industrial-textarea"
                    placeholder="Enter additional requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="booking-sidebar">
              <div className="summary-card">
                <div className="summary-header">
                  <h4>BOOKING SUMMARY</h4>
                </div>
                <div className="summary-body">
                  <div className="summary-item main">
                    <label>Selected Service</label>
                    <div className="service-info">
                      <p className="name">{service?.name}</p>
                      <p className="meta">
                        {formatDuration(service?.duration)} Unit
                      </p>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="summary-item">
                      <label>Deployment Date</label>
                      <p className="val">
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="summary-item">
                      <label>Time Reference</label>
                      <p className="val">{selectedTime}</p>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-total">
                    <label>Operational Cost</label>
                    <p className="cost">{formatPrice(service?.price || 0)}</p>
                  </div>
                </div>

                <div className="summary-footer">
                  <button
                    className="booking-submit-btn"
                    onClick={handleSubmit}
                    disabled={!selectedDate || !selectedTime || submitting}
                  >
                    {submitting ? "PROCESSING..." : "CONFIRM DEPLOYMENT"}
                  </button>
                  <button
                    className="booking-cancel-btn"
                    onClick={() => navigate("/services")}
                  >
                    Abort Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
