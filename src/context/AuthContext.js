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

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });

      localStorage.setItem("token", response.token);
      const userData = response.user || response;

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          profilePhoto: userData.profilePhoto, // ⭐ IMPORTANT
        }),
      );

      setUser({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profilePhoto: userData.profilePhoto,
      });

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user || response));

      setUser(response.user || response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isCustomer,
    login,
    register,
    logout,
    updateUser,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
