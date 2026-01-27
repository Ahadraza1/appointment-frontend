import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  //Company contact email
  const COMPANY_EMAIL = "megrejiahadraza@gmail.com";

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Message sent successfully. Our team will contact you.",
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="static-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Contact Us</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="static-hero">
        <div className="static-hero-container">
          <h1 className="static-title">Get in touch</h1>
          <p className="static-subtitle">
            Have questions about BookMe? Our team is here to provide
            enterprise-grade support and help you synchronize your professional
            scheduling.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="static-content-wrapper">
        <div className="static-container" style={{ maxWidth: "1000px" }}>
          <div className="contact-card-panel">
            {/* Left Column: Info */}
            <div className="contact-info-side">
              <div>
                <h2 className="contact-section-title">Contact Information</h2>
                <p className="contact-section-desc">
                  Reach out via any of our professional channels.
                </p>

                <div className="contact-block">
                  <div className="contact-block-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="contact-block-title">Email Us</h4>
                    <p className="contact-block-value">
                      <a
                        href={`mailto:${COMPANY_EMAIL}`}
                        className="contact-email-link"
                      >
                        {COMPANY_EMAIL}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-block">
                  <div className="contact-block-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="contact-block-title">Call Us</h4>
                    <p className="contact-block-value">+1 (555) 000-PRO-BK</p>
                  </div>
                </div>

                <div className="contact-block">
                  <div className="contact-block-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="contact-block-title">Office Headquarters</h4>
                    <p className="contact-block-value">
                      100 Industrial Plaza
                      <br />
                      Suite 500, Tech District
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>

              <div className="professional-hours">
                <h5 className="hours-title">Professional Hours</h5>
                <div className="hours-grid">
                  <div className="hours-row">
                    <span className="hours-label">Monday - Friday</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-label">Saturday</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-label">Sunday</span>
                    <span style={{ color: "var(--error-400)" }}>Closed</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  className="social-circle"
                  title="X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com"
                  className="social-circle"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com"
                  className="social-circle"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-form-side">
              <h2 className="contact-section-title">Send us a message</h2>
              <p className="contact-section-desc">
                We usually respond within 24 professional hours.
              </p>

              {status.message && (
                <div
                  style={{
                    padding: "var(--spacing-4)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor:
                      status.type === "success"
                        ? "var(--success-50)"
                        : "var(--error-50)",
                    color:
                      status.type === "success"
                        ? "var(--success-700)"
                        : "var(--error-700)",
                    marginBottom: "var(--spacing-6)",
                    fontSize: "var(--font-size-sm)",
                    border: `1px solid ${status.type === "success" ? "var(--success-100)" : "var(--error-100)"}`,
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="static-form-group">
                  <label className="static-label">Full Name</label>
                  <input
                    type="text"
                    className="static-input"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="static-form-group">
                  <label className="static-label">Email Address</label>
                  <input
                    type="email"
                    className="static-input"
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="static-form-group">
                  <label className="static-label">Your Message</label>
                  <textarea
                    className="static-textarea"
                    placeholder="How can we help your business?"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="static-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div
                        className="spinner"
                        style={{
                          width: "16px",
                          height: "16px",
                          borderTopColor: "white",
                        }}
                      ></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polyline points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
