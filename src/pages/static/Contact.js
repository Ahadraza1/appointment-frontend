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
    <div className="static-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Contact Us</span>
        </div>
      </nav>

      {/* Contact Form */}
      <div className="static-content-wrapper">
        <div className="static-container" style={{ maxWidth: "800px" }}>
          <h2>Send us a message</h2>

          {status.message && (
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background:
                  status.type === "success" ? "#ecfdf5" : "#fef2f2",
                color:
                  status.type === "success" ? "#065f46" : "#991b1b",
                marginBottom: "16px",
              }}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              className="static-input"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              required
            />

            <input
              className="static-input"
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              required
            />

            <textarea
              className="static-textarea"
              placeholder="Your Message"
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="static-submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
