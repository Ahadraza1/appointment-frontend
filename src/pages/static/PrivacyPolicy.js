import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./StaticPage.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="static-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Privacy Policy</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="static-hero">
        <div className="static-hero-container">
          <h1 className="static-title">Privacy Policy</h1>
          <p className="static-subtitle">
            At BookPro, we take your data privacy seriously. This policy explains how we collect, 
            use, and protect your personal information in accordance with global standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="static-content-wrapper">
        <div className="static-container">
          <span className="last-updated">Last updated: January 21, 2026</span>

          <section className="static-section">
            <h2 className="static-h2">1. Information We Collect</h2>
            <p className="static-p">
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="static-list">
              <li className="static-list-item">
                <strong>Account Information:</strong> Name, email address, and profile photo provided during registration.
              </li>
              <li className="static-list-item">
                <strong>Appointment Data:</strong> Details of the services you book, including date, time, and service provider.
              </li>
              <li className="static-list-item">
                <strong>Technical Data:</strong> IP address, browser type, and usage patterns to maintain platform security.
              </li>
            </ul>
          </section>

          <section className="static-section">
            <h2 className="static-h2">2. How We Use Your Data</h2>
            <p className="static-p">
              Your data is primarily used to facilitate professional bookings and manage your 
              interface with BookPro service providers. Specifically:
            </p>
            <p className="static-p">
              We process your data to manage appointments, provide customer support, 
              and ensure the integrity of our booking schedules. We do not sell your personal 
              information to third-party advertisers.
            </p>
          </section>

          <section className="static-section">
            <h2 className="static-h2">3. Data Security and Retention</h2>
            <p className="static-p">
              BookPro implements enterprise-grade security measures to protect your data from 
              unauthorized access or disclosure. We retain your information only as long as 
              neccessary to fulfill the purposes outlined in this policy or as required by law.
            </p>
          </section>

          <div className="static-divider"></div>

          <section className="static-section">
            <h2 className="static-h2">4. Your Rights</h2>
            <p className="static-p">
              Depending on your location (e.g., GDPR in the EU), you may have rights to access, 
              correct, or delete your personal data. You can manage most of this directly 
              through your Account Profile settings.
            </p>
          </section>

          <div className="static-info-card">
            <h3 className="card-title">Contact our Privacy Team</h3>
            <p className="card-text">
              If you have questions about this policy or your data, please contact 
              our Data Protection Officer at <strong>privacy@bookpro.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
