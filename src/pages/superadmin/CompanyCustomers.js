import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyCustomers } from "../../services/superAdminService";

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

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h2>Company Customers</h2>
        <p>Customers for Company ID: {companyId}</p>

        <button
          className="btn btn-light"
          onClick={() => navigate(-1)}
        >
          ← Back to Company
        </button>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h4>Customers</h4>

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              className="form-control w-25"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading customers...</p>
          ) : filteredCustomers.length === 0 ? (
            <p>No customers found for this company.</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
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
                      <strong>{customer.name}</strong>
                      <br />
                      <small>{customer.email}</small>
                    </td>
                    <td>{customer.phone || "-"}</td>
                    <td>
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
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
