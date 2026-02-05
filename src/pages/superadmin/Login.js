import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../customer/Auth.css";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      // 🔒 role check (FIXED)
      if (data.role !== "superadmin") {
        setError("Access denied. Super Admin only.");
        setLoading(false);
        return;
      }

      // ✅ IMPORTANT: token + user save karo
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: data.token,
          role: data.role,
          email: data.email,
        }),
      );

      navigate("/superadmin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="auth-logo-icon">
                <svg
                  width="24"
                  height="24"
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
              <span>BOOKME</span>
            </div>
            <h1 className="auth-title">Super Admin Login</h1>
            <p className="auth-subtitle">
              Sign in to access the super admin panel
            </p>
          </div>

          {error && (
            <div
              className="alert alert-error"
              style={{ marginBottom: "var(--spacing-4)" }}
            >
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="superadmin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p style={{ color: "var(--neutral-500)" }}>
              Super Admin access only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
