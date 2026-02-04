import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SuperAdminRoute = () => {
  const { user, loading } = useAuth();

  // ⏳ wait till auth loads
  if (loading) {
    return null;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ not super admin
  if (user.role !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  // ✅ super admin allowed
  return <Outlet />;
};

export default SuperAdminRoute;
