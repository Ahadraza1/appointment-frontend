import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/api";

const CustomerAppointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await adminAPI.getCustomerAppointments(id);

        // ✅ FIX: backend returns { appointments: [...] }
        const list = Array.isArray(res)
          ? res
          : res.appointments || [];

        setAppointments(list);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  // Pagination Logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-customer-appointments">
      <div className="page-header">
        <div>
          <h1>Customer Appointments</h1>
          <p>Appointment history</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/customers")}
        >
          Back to Customers
        </button>
      </div>

      <div className="data-card">
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <>
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
                {paginatedAppointments.map((appt, index) => (
                  <tr key={appt._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      {appt.serviceId?.name ||
                        appt.service?.name ||
                        "N/A"}
                    </td>
                    <td>{new Date(appt.date).toLocaleDateString()}</td>
                    <td>{appt.timeSlot || "N/A"}</td>
                    <td>
                      <span className={`status-pill ${appt.status}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {appointments.length > 0 && (
              <div className="pagination-wrapper">
                <div className="pagination-info">
                  Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span>
                    {Math.min(
                      currentPage * itemsPerPage,
                      appointments.length
                    )}
                  </span>{" "}
                  of <span>{appointments.length}</span> entries
                </div>
                <div className="pagination-controls-refined">
                  <button
                    className="pag-btn prev"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Previous
                  </button>

                  <div className="page-numbers">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        totalPages <= 5 ||
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            className={`page-num ${
                              currentPage === pageNum ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="page-dots">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="pag-btn next"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerAppointments;
