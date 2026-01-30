import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendAdminEmail } from "../../utils/email"; // 👈 IMPORTANT
import "./StaticPage.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // ✅ CUSTOMER → ADMIN EMAIL
      await sendAdminEmail({
        notification_title: "New Contact Request",
        notification_message:
          "A new message has been submitted via Contact Form.",
        customer_name: formState.name,
        customer_email: formState.email,
        customer_message: formState.message,
      });

      setStatus({
        type: "success",
        message: "Message sent successfully. Our team will contact you soon.",
      });

      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("CONTACT EMAIL ERROR:", err);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Breadcrumbs - Optional, keeping for navigation context but consistent with minimal style */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Contact</span>
        </div>
      </nav>

      <div className="contact-content-wrapper">
        <div className="contact-form-container">
          <div className="contact-header">
            <h1 className="contact-page-title">Get in touch</h1>
            <p className="contact-page-subtitle">
              Have a question or need assistance? Fill out the form below and
              we'll get back to you shortly.
            </p>
          </div>

          {status.message && (
            <div
              className={`contact-alert ${status.type === "success" ? "alert-success" : "alert-error"}`}
            >
              <div className="alert-icon">
                {status.type === "success" ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6666 5L7.49992 14.1667L3.33325 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6.66667V10M10 13.3333H10.0083M18.3333 10C18.3333 14.6024 14.6023 18.3333 10 18.3333C5.39762 18.3333 1.66666 14.6024 1.66666 10C1.66666 5.39763 5.39762 1.66667 10 1.66667C14.6023 1.66667 18.3333 5.39763 18.3333 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="alert-content">
                <p className="alert-message">{status.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                placeholder="e.g. John Doe"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="e.g. john@company.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="How can we help you?"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="btn-spinner"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeOpacity="0.2"
                    />
                    <path
                      d="M12 2C6.47715 2 2 6.47715 2 12"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
