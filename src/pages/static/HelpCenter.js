import React from "react";
import { Link } from "react-router-dom";
import "./HelpCenter.css";

const categories = [
  {
    title: "Getting Started",
    desc: "Learn the basics of setting up and using BookPro effectively.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    )
  },
  {
    title: "Account & Profile",
    desc: "Manage your personal settings, security, and preferences.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    )
  },
  {
    title: "Appointments & Scheduling",
    desc: "Master your calendar, availability, and booking rules.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  },
  {
    title: "Payments & Billing",
    desc: "Understand invoices, subscription plans, and payouts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    )
  },
  {
    title: "Notifications & Emails",
    desc: "Configure how you and your clients receive updates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    )
  },
  {
    title: "Admin Panel & Settings",
    desc: "Advanced configurations for teams and business owners.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  },
  {
    title: "Security & Privacy",
    desc: "Information on data encryption and GDPR compliance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  }
];

const popularArticles = [
  "How to book an appointment",
  "Managing availability",
  "Cancelling or rescheduling appointments",
  "Admin approval process",
  "Email notifications not received",
  "Password reset guide"
];

const guides = [
  { title: "Setting up your business", desc: "Configure your business profile and branding." },
  { title: "Accepting online bookings", desc: "Enable the booking widget for your clients." },
  { title: "Managing customers", desc: "Import and organize your client database." },
  { title: "Using admin dashboard", desc: "Navigate through analytics and reports." }
];

const HelpCenter = () => {
  return (
    <main className="help-center">
      {/* 1. HERO SECTION */}
      <section className="help-hero">
        <div className="container">
          <h1>Help Center</h1>
          <p>Find answers, guides, and support for using BookPro</p>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="search"
              className="search-input"
              placeholder="Search for help articles, features, or issues…"
              aria-label="Search help articles"
            />
          </div>
        </div>
      </section>

      {/* 2. QUICK HELP CATEGORIES */}
      <section className="help-section">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <Link key={i} to={`#${cat.title.toLowerCase().replace(/ /g, "-")}`} className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. POPULAR ARTICLES */}
      <section className="help-section">
        <h2>Popular Articles</h2>
        <div className="article-grid">
          {popularArticles.map((item, i) => (
            <Link key={i} to="#" className="article-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {item}
            </Link>
          ))}
        </div>
      </section>

      {/* 4. STEP-BY-STEP GUIDES */}
      <section className="help-section">
        <h2>Foundational Guides</h2>
        <div className="guide-container">
          {guides.map((guide, i) => (
            <div key={i} className="guide-card">
              <div className="guide-step">{i + 1}</div>
              <h3>{guide.title}</h3>
              <p>{guide.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STILL NEED HELP? (SUPPORT CTA) */}
      <section className="help-section support-cta-section">
        <div className="support-cta-card">
          <h2>Still need help?</h2>
          <p>Our dedicated support team is ready to assist you with any questions or technical issues.</p>
          <div className="cta-flex">
            <Link to="/contact" className="btn-hc primary">Contact Support</Link>
            <Link to="/faq" className="btn-hc secondary">View FAQ</Link>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM STATUS / SUPPORT INFO */}
      <section className="system-status">
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">System Status</span>
            <div className="status-indicator">
              <div className="pulse"></div>
              <span className="status-value">All Systems Operational</span>
            </div>
          </div>
          <div className="status-item">
            <span className="status-label">Support Hours</span>
            <span className="status-value">Mon–Fri, 9:00 AM – 7:00 PM EST</span>
          </div>
          <div className="status-item">
            <span className="status-label">Response Time</span>
            <span className="status-value">Typically under 24 hours</span>
          </div>
          <div className="status-item">
            <span className="status-label">Compliance</span>
            <span className="status-value">GDPR & ISO 27001 Certified</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;

