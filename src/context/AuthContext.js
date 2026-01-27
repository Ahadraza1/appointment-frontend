import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FIX 1: Properly restore auth state on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // 🔥 FIX 2: Normalized login response handling
  const login = async (email, password) => {
    try {
      setError(null);

      const response = await authAPI.login({ email, password });

      const token = response.token;
      const userData = response.user;

      if (!token || !userData) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return response;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    }
  };

  // 🔥 FIX 3: Register flow aligned with login
  const register = async (data) => {
    try {
      setError(null);

      const response = await authAPI.register(data);

      const token = response.token;
      const userData = response.user;

      if (!token || !userData) {
        throw new Error("Invalid register response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return response;
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    }
  };

  // 🔥 FIX 4: Clean logout (prevents ghost auth)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🔥 FIX 5: Central user update (profile / photo / role)
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer",
    login,
    register,
    logout,
    updateUser,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
