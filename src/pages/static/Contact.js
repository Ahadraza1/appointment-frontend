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
        notification_message: "A new message has been submitted via Contact Form.",
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
    <div className="static-page contact-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Contact Us</span>
        </div>
      </nav>

      {/* Contact Form Section */}
      <div className="contact-content-wrapper">
        <div className="contact-form-container">
          {/* Page Heading */}
          <div className="contact-header">
            <h1 className="contact-page-title">Send us a message</h1>
          </div>

          {/* Alert Messages */}
          {status.message && (
            <div className={`contact-alert ${status.type === "success" ? "alert-success" : "alert-error"}`}>
              <div className="alert-icon">
                {status.type === "success" ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <div className="alert-content">
                <p className="alert-message">{status.message}</p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
                autoComplete="name"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Your Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                required
                autoComplete="email"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell us how we can help you..."
                rows="6"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                required
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="form-submit-btn"
              disabled={loading}
              aria-label={loading ? "Sending message" : "Send message"}
            >
              {loading ? (
                <>
                  <svg className="btn-spinner" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="50.265" strokeDashoffset="25" opacity="0.25"/>
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="50.265" strokeDashoffset="40"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M2.5 10H17.5M17.5 10L11.25 3.75M17.5 10L11.25 16.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
