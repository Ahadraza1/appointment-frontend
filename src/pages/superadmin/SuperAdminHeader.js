import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./SuperAdminHeader.css";

const SuperAdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/superadmin/login");
  };

  return (
    <header className="superadmin-header">
      <h1>Super Admin Panel</h1>

      <div className="header-right">
        <span className="admin-name">
          {user?.name || "Super Admin"}
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default SuperAdminHeader;
