import React, { useState, useMemo } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CustomerLayout.css";

const API_URL = process.env.REACT_APP_API_URL?.replace("/api", "");

const CustomerLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

const avatarUrl = useMemo(() => {
    if (!user?.profilePhoto) return null;
    if (user.profilePhoto.startsWith("http")) return user.profilePhoto;
    return `${API_URL}${user.profilePhoto}`;
  }, [user?.profilePhoto]);

  return (
    <div className="customer-layout">
      {/* Navigation */}
      <nav className="customer-nav">
        <div className="container">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M7.5 4.21l4.5 2.6 4.5-2.6"></path>
                <path d="M7.5 19.79l4.5-2.6 4.5 2.6"></path>
                <line x1="12" y1="9" x2="12" y2="15"></line>
              </svg>
            </div>
            <span>BOOKME</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Pricing
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/my-appointments"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                My Appointments
              </NavLink>
            )}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {isAuthenticated ? (
              <div className="nav-user-menu">
                <button
                  className="nav-user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="nav-user-avatar">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={user?.name || "User"}
                        className="nav-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="nav-avatar-fallback">
                        {getInitials(user?.name)}
                      </span>
                    )}
                  </div>

                  <span className="hide-mobile">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className={`nav-dropdown ${dropdownOpen ? "open" : ""}`}>
                  <Link
                    to="/profile"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg
                      width="18"
                      height="18"
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
                    My Appointments
                  </Link>
                  <div className="nav-dropdown-divider"></div>
                  <button
                    className="nav-dropdown-item danger"
                    onClick={handleLogout}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary hide-mobile">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
          onClick={() => setMobileMenuOpen(false)}
          end
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Services
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Pricing
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink
              to="/my-appointments"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                width="20"
                height="20"
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
              My Appointments
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </NavLink>
          </>
        )}
      </div>

      {/* Main Content */}
      <main className="customer-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="customer-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="nav-logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <path d="M7.5 4.21l4.5 2.6 4.5-2.6"></path>
                    <path d="M7.5 19.79l4.5-2.6 4.5 2.6"></path>
                    <line x1="12" y1="9" x2="12" y2="15"></line>
                  </svg>
                </div>
                <span>BOOKME</span>
              </div>
              <p className="footer-description">
                Professional booking system for modern businesses. Streamline
                your appointments and grow your business with ease.
              </p>
              <div className="footer-social">
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

            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <div className="footer-links">
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Support</h4>
              <div className="footer-links">
                <Link to="/help-center" className="footer-link">
                  Help Center
                </Link>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Legal</h4>
              <div className="footer-links">
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
                <a href="#" className="footer-link">
                  Cookie Policy
                </a>
                <a href="#" className="footer-link">
                  GDPR
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 BookMe. All rights reserved.</p>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-link">
                Privacy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms
              </Link>
              <a href="#" className="footer-link">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
