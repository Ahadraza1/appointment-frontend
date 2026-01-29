import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./StaticPage.css";

const Terms = () => {
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
          <span className="breadcrumb-active">Terms of Service</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="static-hero">
        <div className="static-hero-container">
          <h1 className="static-title">Terms of Service</h1>
          <p className="static-subtitle">
            These terms govern your use of the BookPro platform. By accessing our services, 
            you agree to be bound by the following professional standards and legal requirements.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="static-content-wrapper">
        <div className="static-container">
          <span className="last-updated">Last updated: January 21, 2026</span>

          <section className="static-section">
            <h2 className="static-h2">1. Acceptance of Terms</h2>
            <p className="static-p">
              By creating an account or using any part of the BookPro platform, you represent 
              that you have read and understood these terms. Our platform is intended for 
              professional use, and users must be at least 18 years of age.
            </p>
          </section>

          <section className="static-section">
            <h2 className="static-h2">2. User Responsibilities</h2>
            <p className="static-p">
              As a user of BookPro, you are responsible for maintaining the confidentiality of 
              your account credentials and for all activities that occur under your account. 
              You agree to provide accurate information for all bookings.
            </p>
          </section>

          <section className="static-section">
            <h2 className="static-h2">3. Service Appointments</h2>
            <p className="static-p">
              Bookings made through BookPro are subject to the individual provider's 
              cancellation policies and availability. BookPro acts as the infrastructure 
              facilitating these professional connections but is not responsible for the 
              service quality provided by third-party units.
            </p>
          </section>

          <div className="static-divider"></div>

          <section className="static-section">
            <h2 className="static-h2">4. Prohibited Conduct</h2>
            <p className="static-p">
              Users may not use BookPro for any illegal activities, harassment, or to 
              interfere with the platform's industrial operations. We reserve the right 
              to terminate accounts that violate these professional conduct standards.
            </p>
          </section>

          <div className="static-info-card">
            <h3 className="card-title">Legal Inquiries</h3>
            <p className="card-text">
              For any legal concerns regarding these terms, please reach out to 
              <strong>legal@bookme.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
