import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/superAdminLayout.css";

const SuperAdminLayout = () => {
  return (
    <div className="sa-layout">
      {/* SIDEBAR */}
      <aside className="sa-sidebar">
        <h2 className="sa-logo">BOOKME</h2>

        <nav className="sa-nav">
          <Link to="/superadmin/dashboard">Dashboard</Link>
          <Link to="/superadmin/companies">Companies</Link>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="sa-main">
        {/* TOPBAR */}
        <header className="sa-topbar">
          <span>Super Admin Panel</span>
          <button className="sa-logout">Logout</button>
        </header>

        {/* PAGE CONTENT */}
        <main className="sa-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
