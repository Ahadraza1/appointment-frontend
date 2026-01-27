import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./StaticPage.css";

const About = () => {
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
          <span className="breadcrumb-active">About Us</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="static-hero">
        <div className="static-hero-container">
          <div className="category-badge" style={{ marginBottom: 'var(--spacing-6)' }}>Our Story</div>
          <h1 className="static-title">Precision Booking for<br />Modern Business</h1>
          <p className="static-subtitle">
            BookMe is the industry standard for professional service management. 
            We bridge the gap between clients and providers with enterprise-grade reliability.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="static-content-wrapper">
        <div className="static-container" style={{ maxWidth: '1000px' }}>
          
          <div className="static-grid-3">
            <div className="static-value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="static-h3">Synchronized</h3>
              <p className="static-p" style={{ fontSize: 'var(--font-size-sm)' }}>
                Building infrastructure where every appointment is synchronized in real-time across all units.
              </p>
            </div>

            <div className="static-value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="static-h3">Secure</h3>
              <p className="static-p" style={{ fontSize: 'var(--font-size-sm)' }}>
                Enterprise-grade security protocols ensuring that your professional data remains private and protected.
              </p>
            </div>

            <div className="static-value-card">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="static-h3">Scalable</h3>
              <p className="static-p" style={{ fontSize: 'var(--font-size-sm)' }}>
                Designed to handle thousands of bookings per second, scaling perfectly with your business growth.
              </p>
            </div>
          </div>

          <section className="static-section">
            <h2 className="static-h2">The BookMe Standard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-12)', alignItems: 'center' }}>
              <div>
                <p className="static-p">
                  Unlike generic scheduling tools, BookMe is designed with an industrial 
                  SaaS mindset. Every feature—from the dynamic calendar to the admin 
                  control panel—is built for speed, accuracy, and professional scale.
                </p>
                <p className="static-p">
                  Our platform handles specialized units across multiple service sectors, 
                  providing providers with the tools they need to manage their time and 
                  providing clients with the easiest booking experience in the industry.
                </p>
              </div>
              <div style={{ background: 'var(--neutral-50)', padding: 'var(--spacing-10)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--neutral-100)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>Platform Capabilities</h4>
                <ul className="static-list" style={{ marginBottom: 0 }}>
                  <li className="static-list-item">Real-time unit synchronization</li>
                  <li className="static-list-item">Dynamic availability filters</li>
                  <li className="static-list-item">Automated professional notifications</li>
                  <li className="static-list-item">Industrial-grade admin dashboard</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="static-info-card">
            <h3 className="card-title">Join the Ecosystem</h3>
            <p className="card-text">
              Interested in integrating BookMe into your enterprise? 
              Reach out to our partners team at <strong>hello@bookme.com</strong>.
            </p>
            <div style={{ marginTop: 'var(--spacing-8)' }}>
              <Link to="/contact" className="btn btn-primary" style={{ padding: 'var(--spacing-3) var(--spacing-8)', borderRadius: 'var(--radius-full)' }}>
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
