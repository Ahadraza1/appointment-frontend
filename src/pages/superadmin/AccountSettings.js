import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSuperAdminProfile,
  updateSuperAdminProfile,
  changeSuperAdminPassword,
  updateSuperAdminProfilePhoto,
  removeSuperAdminProfilePhoto,
} from "../../services/superAdminService";
import "./SuperAdminPages.css";
import "./AccountSettings.css"; // Import new specific styles

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [email, setEmail] = useState("");

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
  const [error, setError] = useState("");

  // UI State for Profile Image (Frontend Only)
  const [profilePhotoFile, setProfilePhotoFile] = useState(null); // ✅ ADD
  const [previewImage, setPreviewImage] = useState(null);

  /* ================= LOAD PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await getSuperAdminProfile();
      const BASE_URL = process.env.REACT_APP_API_URL?.replace("/api", "");
      // ✅ name & phone profile state me
      setProfile({
        name: res.data.profile.name,
        phone: res.data.profile.phone,
        email: res.data.profile.email,
      });

      // ✅ ADD: set preview image from backend
      if (res.data.profile.profilePhoto) {
        setPreviewImage(`${BASE_URL}${res.data.profile.profilePhoto}`);
      }

      setEmail(res.data.profile.email);
    } catch (err) {
      console.error("Load profile error:", err);
      setError("Failed to load profile");
      toast.error("Failed to load profile");
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

    console.log("Submitting profile:", {
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
    });

    try {
      // 1️⃣ Update basic profile (name, email, phone)
      const res = await updateSuperAdminProfile({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
      });

      setProfile(res.data.profile);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      // 🔥 sync updated profile to localStorage
      if (userInfo?.user) {
        userInfo.user.email = res.data.profile.email;
        userInfo.user.name = res.data.profile.name;
        userInfo.user.phone = res.data.profile.phone;

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

      // 2️⃣ ✅ Upload profile photo (ONLY if selected)
      if (profilePhotoFile) {
        const formData = new FormData();
        formData.append("profilePhoto", profilePhotoFile);

        const photoRes = await updateSuperAdminProfilePhoto(formData);

        // ✅ sync photo to localStorage (for header/navbar)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo?.user && photoRes?.data?.profilePhoto) {
          userInfo.user.profilePhoto = photoRes.data.profilePhoto;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err?.response?.data?.message || "Failed to update profile");
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PASSWORD UPDATE ================= */
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return setError("New password and confirm password do not match");
    }

    try {
      setLoading(true);
      await changeSuperAdminPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Password update error:", err);
      setError("Failed to update password");
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= IMAGE HANDLER (UI ONLY) ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePhotoFile(file); // ✅ store file for upload
    setPreviewImage(URL.createObjectURL(file)); // ✅ preview
  };

  /* ================= REMOVE PROFILE PHOTO ================= */
  const handleRemovePhoto = async () => {
    try {
      setLoading(true);

      const res = await removeSuperAdminProfilePhoto();

      // UI reset
      setPreviewImage(null);
      setProfilePhotoFile(null);

      // localStorage sync (for header)
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.user) {
        userInfo.user.profilePhoto = null;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

      toast.success("Profile photo removed successfully");
    } catch (err) {
      console.error("Remove photo error:", err);
      setError("Failed to remove profile photo");
      toast.error("Failed to remove profile photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sa-dashboard-container">
      <div className="sa-settings-wrapper">
        {/* MASTER HEADER */}
        <div className="sa-header-main-card" style={{ marginBottom: "2rem" }}>
          <div className="sa-header-top-row">
            <div className="sa-header-title-section">
              <h2 className="sa-page-title-text" style={{ fontSize: "2rem" }}>
                Account Settings
              </h2>
              <p className="sa-page-subtitle">
                Manage your personal profile and account security preferences
              </p>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="sa-tabs-container">
          <div className="sa-tabs-list">
            <button
              className={`sa-settings-tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </button>
            <button
              className={`sa-settings-tab ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Security
            </button>
          </div>
        </div>

        {/* ================= PROFILE TAB ================= */}
        {activeTab === "profile" && (
          <div className="sa-profile-layout">
            {/* SIDEBAR: AVATAR */}
            <div className="sa-profile-sidebar">
              <div className="sa-avatar-wrapper">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="sa-avatar-image"
                  />
                ) : (
                  <div className="sa-avatar-fallback">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
                  </div>
                )}

                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="sa-avatar-remove-btn"
                    title="Remove Photo"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                )}

                <label className="sa-avatar-upload-btn" title="Upload Photo">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </label>
              </div>

              <div style={{ textAlign: "center" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  {profile.name || "Super Admin"}
                </h3>
                <span className="sa-profile-role-badge">Super Admin</span>
              </div>
            </div>

            {/* MAIN CONTENT: FORM */}
            <div className="sa-profile-content">
              <div style={{ marginBottom: "2rem" }}>
                <h3 className="sa-section-title">Personal Information</h3>
                <p className="sa-section-desc">
                  Update your personal details and contact information.
                </p>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="sa-grid-form">
                  {/* Full Name */}
                  <div className="sa-input-group sa-full-width">
                    <label className="sa-input-label">Full Name</label>
                    <div className="sa-input-wrapper">
                      <svg
                        className="sa-input-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input
                        type="text"
                        className="sa-input has-icon"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="sa-input-group sa-full-width">
                    <label className="sa-input-label">Email Address</label>
                    <div className="sa-input-wrapper">
                      <svg
                        className="sa-input-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <input
                        type="email"
                        className="sa-input has-icon"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        marginTop: "0.25rem",
                      }}
                    >
                      Make sure this email is unique and valid.
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div className="sa-input-group sa-full-width">
                    <label className="sa-input-label">Phone Number</label>
                    <div className="sa-input-wrapper">
                      <svg
                        className="sa-input-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <input
                        type="text"
                        className="sa-input has-icon"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "2.5rem",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="submit"
                    className="sa-btn-premium"
                    disabled={loading}
                    style={{ minWidth: "160px", justifyContent: "center" }} // Ensure button width
                  >
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= SECURITY TAB ================= */}
        {activeTab === "security" && (
          <div className="sa-security-layout">
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <h3 className="sa-section-title">Security Settings</h3>
              <p className="sa-section-desc">
                Manage your password and account security.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div
                className="sa-input-group"
                style={{ marginBottom: "1.5rem" }}
              >
                <label className="sa-input-label">Current Password</label>
                <div className="sa-input-wrapper">
                  <svg
                    className="sa-input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type="password"
                    className="sa-input has-icon"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div
                className="sa-input-group"
                style={{ marginBottom: "1.5rem" }}
              >
                <label className="sa-input-label">New Password</label>
                <div className="sa-input-wrapper">
                  <svg
                    className="sa-input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type="password"
                    className="sa-input has-icon"
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
              </div>

              <div className="sa-input-group" style={{ marginBottom: "2rem" }}>
                <label className="sa-input-label">Confirm New Password</label>
                <div className="sa-input-wrapper">
                  <svg
                    className="sa-input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type="password"
                    className="sa-input has-icon"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <button
                  type="submit"
                  className="sa-btn-premium"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {loading ? "Updating Password..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
