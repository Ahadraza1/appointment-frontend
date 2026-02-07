import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Customer Pages
import CustomerLayout from "./layouts/CustomerLayout";
import Home from "./pages/customer/Home";
import Services from "./pages/customer/Services";
import BookAppointment from "./pages/customer/BookAppointment";
import AppointmentConfirmation from "./pages/customer/AppointmentConfirmation";
import MyAppointments from "./pages/customer/MyAppointments";
import CustomerProfile from "./pages/customer/Profile";
import CustomerLogin from "./pages/customer/Login";
import CustomerRegister from "./pages/customer/Register";
import Pricing from "./pages/customer/Pricing";
import Payment from "./pages/customer/Payment";
import PaymentSuccess from "./pages/customer/PaymentSuccess";
import PaymentFailed from "./pages/customer/PaymentFailed";

// Static Pages
import About from "./pages/static/About";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import Terms from "./pages/static/Terms";
import Contact from "./pages/static/Contact";
import HelpCenter from "./pages/static/HelpCenter";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAppointments from "./pages/admin/Appointments";
import AdminCustomers from "./pages/admin/Customers";
import AdminCustomerAppointments from "./pages/admin/CustomerAppointments";
import AdminServices from "./pages/admin/Services";
import AdminAvailability from "./pages/admin/Availability";
import AdminSettings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";

// Super Admin Pages
import SuperAdminLogin from "./pages/superadmin/Login";
import SuperAdminDashboard from "./pages/superadmin/superAdminDashboard";
import Companies from "./pages/superadmin/Companies";
import CompanyAdmins from "./pages/superadmin/CompanyAdmins";
import CompanyDetails from "./pages/superadmin/CompanyDetails";
import CompanyServices from "./pages/superadmin/CompanyServices";
import CreateCompany from "./pages/superadmin/CreateCompany";

// Protected Routes
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";
import SuperAdminRoute from "./components/common/SuperAdminRoute"; // ✅ NEW

import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    console.log(
      "EMAILJS SERVICE ID:",
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
    );
  }, []);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* ================= CUSTOMER ROUTES ================= */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<CustomerLogin />} />
          <Route path="register" element={<CustomerRegister />} />
          <Route path="pricing" element={<Pricing />} />

          <Route element={<ProtectedRoute />}>
            <Route path="book/:serviceId" element={<BookAppointment />} />
            <Route
              path="confirmation/:appointmentId"
              element={<AppointmentConfirmation />}
            />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="help-center" element={<HelpCenter />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route
            path="customers/:id/appointments"
            element={<AdminCustomerAppointments />}
          />
          <Route path="services" element={<AdminServices />} />
          <Route path="availability" element={<AdminAvailability />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ================= SUPER ADMIN LOGIN ================= */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />

        {/* ================= SUPER ADMIN ROUTES ================= */}
        <Route element={<SuperAdminRoute />}>
          <Route element={<SuperAdminLayout />}>
            <Route
              path="/superadmin/dashboard"
              element={<SuperAdminDashboard />}
            />

            <Route path="/superadmin/companies" element={<Companies />} />

            <Route
              path="/superadmin/companies/create"
              element={<CreateCompany />}
            />

            <Route
              path="/superadmin/company-admins"
              element={<CompanyAdmins />}
            />

            <Route
              path="/superadmin/companies/:id"
              element={<CompanyDetails />}
            />

            <Route
              path="/superadmin/companies/:id/admins"
              element={<CompanyAdmins />}
            />

            <Route
              path="/superadmin/companies/:id/services"
              element={<CompanyServices />}
            />
            
          </Route>
        </Route>
        {/* ================= 404 ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
