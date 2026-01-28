import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/api";

const CustomerAppointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await adminAPI.getCustomerAppointments(id);
        // ✅ FIX: backend returns { appointments: [...] }
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  return (
    <div className="admin-customer-appointments">
      <div className="page-header">
        <div className="header-content">
          <h1>Customer Appointments</h1>
          <p className="subtitle">Appointment history</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/customers")}
        >
          Back to Customers
        </button>
      </div>

      <div className="data-card" style={{ padding: "1rem" }}>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt._id}>
                  <td>{index + 1}</td>
                  <td>
                    {appt.serviceId?.name ||
                      appt.service?.name ||
                      appt.serviceName ||
                      "N/A"}
                  </td>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>
                    {appt.time
                      ? appt.time
                      : appt.date
                        ? new Date(appt.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                  </td>
                  <td>{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerAppointments;
