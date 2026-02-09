import React, { useEffect, useState } from "react";
import {
  getSuperAdminProfile,
  updateSuperAdminProfile,
  changeSuperAdminPassword,
} from "../../services/superAdminService";
import "./SuperAdminPages.css";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await getSuperAdminProfile();
      setProfile(res.data.profile);
    } catch (err) {
      console.error("Load profile error:", err);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= PROFILE UPDATE ================= */
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await updateSuperAdminProfile({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
      });

      setProfile(res.data.profile);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      // 🔥 IMPORTANT: sync updated profile to state
      if (userInfo?.user) {
        userInfo.user.email = res.data.profile.email;
        userInfo.user.name = res.data.profile.name;
        userInfo.user.phone = res.data.profile.phone;

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

      setMessage("Profile updated successfully");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PASSWORD UPDATE ================= */
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setError("New password and confirm password do not match");
    }

    try {
      setLoading(true);
      await changeSuperAdminPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setMessage("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Password update error:", err);
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-dashboard-container">
      {/* MASTER HEADER */}
      <div className="sa-header-main-card">
        <div className="sa-header-top-row">
          <div className="sa-header-title-section">
            <h2 className="sa-page-title-text">Account Settings</h2>
            <p className="sa-page-subtitle">
              Manage your personal profile and account security preferences
            </p>
          </div>
        </div>
      </div>

      {/* SETTINGS CARD */}
      <div className="sa-data-card" style={{ padding: 0, overflow: "visible" }}>
        {/* TABS HEADER */}
        <div className="sa-tabs-header">
          <button
            className={`sa-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`sa-tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="sa-tab-content" style={{ padding: "2rem" }}>
          <div className="sa-form-layout">
            {error && (
              <div className="sa-alert-box error">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            {message && (
              <div className="sa-alert-box success">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {message}
              </div>
            )}

            {/* ================= PROFILE TAB ================= */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit}>
                <div className="sa-form-group">
                  <label className="sa-form-label">Full Name</label>
                  <input
                    type="text"
                    className="sa-form-input"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="sa-form-group">
                  <label className="sa-form-label">Email Address</label>
                  <input
                    type="email"
                    className="sa-form-input"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                      marginTop: "0.5rem",
                    }}
                  >
                    Make sure this email is unique and valid.
                  </p>
                </div>

                <div className="sa-form-group">
                  <label className="sa-form-label">Phone Number</label>
                  <input
                    type="text"
                    className="sa-form-input"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                  />
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <button
                    type="submit"
                    className="sa-btn-primary"
                    disabled={loading}
                    style={{ width: "100%", height: "48px", fontSize: "1rem" }}
                  >
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* ================= SECURITY TAB ================= */}
            {activeTab === "security" && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="sa-form-group">
                  <label className="sa-form-label">Current Password</label>
                  <input
                    type="password"
                    className="sa-form-input"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="sa-form-group">
                  <label className="sa-form-label">New Password</label>
                  <input
                    type="password"
                    className="sa-form-input"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                  />
                </div>

                <div className="sa-form-group">
                  <label className="sa-form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="sa-form-input"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your new password"
                  />
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <button
                    type="submit"
                    className="sa-btn-primary"
                    disabled={loading}
                    style={{ width: "100%", height: "48px", fontSize: "1rem" }}
                  >
                    {loading ? "Updating Password..." : "Update Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
