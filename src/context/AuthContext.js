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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);

        // ✅ role normalize (SAFE FIX)
        if (parsedUser?.role) {
          parsedUser.role = parsedUser.role.toLowerCase();
        }

        setUser(parsedUser);
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

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });

    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role?.toLowerCase(), // ✅ normalize
      profilePhoto: data.profilePhoto,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  const register = async (data) => {
    try {
      setError(null);

      const response = await authAPI.register(data);

      const userData = {
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role?.toLowerCase(), // ✅ normalize
        profilePhoto: response.profilePhoto,
      };

      if (!response.token) {
        throw new Error("Invalid register response");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return response;
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    if (updatedUser?.role) {
      updatedUser.role = updatedUser.role.toLowerCase();
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,

    // ✅ CLEAR ROLE FLAGS
    isSuperAdmin: user?.role === "super_admin",
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
