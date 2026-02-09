import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyCustomers } from "../../services/superAdminService";
import "./SuperAdminPages.css";

const CompanyCustomers = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, [companyId]);

  const fetchCustomers = async () => {
    try {
      const res = await getCompanyCustomers(companyId);
      setCustomers(res.data.customers || []);
    } catch (error) {
      console.error("Fetch company customers error", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email} ${c.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="sa-loading-container">
        <div className="sa-spinner"></div>
        <p className="sa-loading-text">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="sa-dashboard-container">
      {/* MASTER HEADER */}
      <div className="sa-page-header">
        <div className="sa-header-title-section">
          <h2 className="sa-page-title-text">Company Customers</h2>
          <p className="sa-page-subtitle">Customers for Company ID: {companyId}</p>
        </div>

        <div className="sa-header-actions">
           <button
            className="sa-btn-secondary"
            onClick={() => navigate(-1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Company
          </button>
        </div>
      </div>

      <div className="sa-header-main-card" style={{ marginBottom: '2rem' }}>
        <div className="sa-header-control-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sa-search-bar-container sa-search-bar-rounded">
                <svg className="sa-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    className="sa-header-search-input"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
      </div>

      {/* DATA CARD */}
      <div className="sa-data-card">
        <div className="sa-table-wrapper">
          {filteredCustomers.length === 0 ? (
            <div className="sa-empty-state-row" style={{ padding: '3rem', textAlign: 'center' }}>
                <p className="sa-empty-state-text">No customers found for this company.</p>
            </div>
          ) : (
            <table className="sa-data-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="sa-user-cell">
                        <div className="sa-user-avatar">
                            {customer.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sa-user-info">
                            <div className="sa-user-name">{customer.name}</div>
                            <div className="sa-user-email" style={{ fontSize: '0.8rem', color: '#64748b' }}>{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.phone || "-"}</td>
                    <td>
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="sa-btn-primary"
                        style={{ height: '36px', fontSize: '0.8rem', padding: '0 1rem' }}
                        onClick={() =>
                          navigate(
                            `/superadmin/companies/${companyId}/customers/${customer._id}/appointments`
                          )
                        }
                      >
                        View Appointments
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCustomers;
