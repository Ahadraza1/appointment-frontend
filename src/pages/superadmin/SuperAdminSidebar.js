import React from "react";
import { NavLink } from "react-router-dom";
import "./SuperAdminSidebar.css";

const SuperAdminSidebar = () => {
  return (
    <aside className="superadmin-sidebar">
      <h2 className="brand">BOOKME</h2>
      <p className="role-label">Super Admin</p>

      <nav className="nav-links">
        <NavLink to="/superadmin/dashboard">Dashboard</NavLink>
        <NavLink to="/superadmin/companies">Companies</NavLink>
        <NavLink to="/superadmin/company-admins">Admins</NavLink>
        <NavLink to="/superadmin/company-stats">Stats</NavLink>
      </nav>
    </aside>
  );
};

export default SuperAdminSidebar;
