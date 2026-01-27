import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-main-content">
            <div className="hero-text">
              <div className="hero-badge">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Trusted by 10,000+ businesses
              </div>
              <h1 className="hero-title">
                Professional Booking <span>Made Simple</span>
              </h1>
              <p className="hero-description">
                Streamline your appointment scheduling with our enterprise-grade
                booking platform. Save time, reduce no-shows, and grow your
                business with ease.
              </p>
              <div className="hero-actions">
                <Link to="/services" className="btn-primary-action btn-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book Now
                </Link>
                <Link to="/services" className="btn-secondary-outline btn-lg">
                  View Services
                </Link>
              </div>
              
              {user && (user.planType === "free" || !user.planType) && (
                <div
                  style={{
                    marginTop: "16px",
                    fontWeight: "600",
                    color: "#0f4c75",
                  }}
                >
                  Bookings used: {user.bookingUsed ?? 0} /{" "}
                  {user.bookingLimit ?? 10}
                </div>
              )}

              {user && user.planType && user.planType !== "free" && (
                <div
                  style={{
                    marginTop: "16px",
                    fontWeight: "600",
                    color: "#2ecc71",
                  }}
                >
                  Unlimited bookings (Pro plan)
                </div>
              )}
            </div>
          </div>

          <div className="hero-bottom-panel">
            <div className="hero-data-container">
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">
                    50K<span>+</span>
                  </div>
                  <p className="hero-stat-label">Appointments Booked</p>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">
                    98<span>%</span>
                  </div>
                  <p className="hero-stat-label">Customer Satisfaction</p>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">24/7</div>
                  <p className="hero-stat-label">Online Booking</p>
                </div>
              </div>

              <div className="hero-trust-grid">
                <div className="trust-item">
                  <div className="trust-icon success">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span className="trust-title">Booking Confirmed</span>
                    <span className="trust-subtitle">
                      Instant Notifications
                    </span>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon primary">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span className="trust-title">Secure Payment</span>
                    <span className="trust-subtitle">
                      256-bit SSL Protection
                    </span>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon secondary">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span className="trust-title">24/7 Available</span>
                    <span className="trust-subtitle">Book On Your Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">
              Everything You Need to Book With Confidence
            </h2>
            <p className="section-description">
              Our platform combines simplicity with powerful features to give
              you the best booking experience.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="feature-title">Easy Scheduling</h3>
              <p className="feature-description">
                Book appointments in seconds with our intuitive calendar
                interface. Choose your preferred date and time slot with just a
                few clicks.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon secondary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3 className="feature-title">Smart Reminders</h3>
              <p className="feature-description">
                Never miss an appointment with automated email and SMS
                reminders. Stay organized and on schedule effortlessly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon success">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your data is protected with enterprise-grade security. We never
                share your information with third parties.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-title">Expert Professionals</h3>
              <p className="feature-description">
                Access a network of verified and experienced professionals.
                Quality service guaranteed every time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon secondary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="feature-title">Flexible Timing</h3>
              <p className="feature-description">
                Book appointments that fit your schedule. Reschedule or cancel
                anytime with no hassle.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon success">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="feature-title">Instant Confirmation</h3>
              <p className="feature-description">
                Get immediate booking confirmation. Receive all details via
                email right after you book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Book your appointment in 4 easy steps
            </p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Choose Service</h3>
              <p className="step-description">
                Browse our services and select the one that fits your needs
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Select Time</h3>
              <p className="step-description">
                Pick your preferred date and available time slot
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Confirm Details</h3>
              <p className="step-description">
                Review your booking details and confirm
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">You're All Set!</h3>
              <p className="step-description">
                Receive confirmation and show up on time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers. Book your first appointment
              today and experience the difference.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="cta-btn-primary">
                Create Free Account
              </Link>
              <Link to="/services" className="cta-btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
