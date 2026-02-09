import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./SuperAdminLayout.css";

const API_URL = process.env.REACT_APP_API_URL?.replace("/api", "");

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/superadmin/login"); // Redirect to superadmin login
  };

  const getInitials = (name) => {
    if (!name) return "SA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    const titles = {
      dashboard: "Dashboard",
      companies: "Companies",
      admins: "Company Admins", // Nested route might need adjustment if logic is complex
    };
    // Handle nested company details/admins
    if (location.pathname.includes("/companies/")) {
      if (location.pathname.endsWith("/admins")) return "Company Admins";
      return "Company Details";
    }
    return titles[path] || "Super Admin";
  };

  const navItems = [
    {
      to: "/superadmin/dashboard",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      to: "/superadmin/companies",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4 8 4v14" />
          <path d="M17 21v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V21" />
        </svg>
      ),
      label: "Companies",
    },
    {
      to: "/superadmin/company-admins",
      icon: (
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
      ),
      label: "Company Admins",
    },
    {
      to: "/superadmin/settings",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      label: "Account Settings",
    },
  ];

  return (
    <div className={`sa-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar Overlay */}
      <div
        className={`sa-sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`sa-sidebar ${sidebarOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
      >
        <div className="sa-sidebar-header">
          <div className="sa-sidebar-logo">
            <div className="sa-sidebar-logo-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            {!collapsed && <span>SUPER ADMIN</span>}
          </div>
          <button
            className="sa-sidebar-toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {collapsed ? (
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
              ) : (
                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
              )}
            </svg>
          </button>
        </div>

        <nav className="sa-sidebar-nav">
          {!collapsed && <p className="sa-sidebar-nav-title">Menu</p>}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sa-sidebar-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
              title={collapsed ? item.label : ""}
              end={item.to === "/superadmin/dashboard"} // Exact match for dashboard to avoid active state issues if necessary
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sa-sidebar-footer">
          <button
            className="sa-sidebar-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sa-main">
        {/* Header */}
        <header className="sa-header">
          <div className="sa-header-left">
            <button
              className="sa-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
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
            </button>
            <h1 className="sa-page-title">{getPageTitle()}</h1>
          </div>

          <div className="sa-header-right">
            <div className="sa-profile-dropdown">
              <div className="sa-profile-info">
                <span className="sa-profile-name">
                  {user?.name || "Super Admin"}
                </span>
                <span className="sa-profile-role">Super Admin</span>
              </div>
              <div className="sa-profile-avatar">
                {user?.profilePhoto ? (
                  <img
                    src={`${API_URL}${user.profilePhoto}?v=${Date.now()}`}
                    alt={user.name}
                    className="sa-avatar-img"
                  />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="sa-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;
