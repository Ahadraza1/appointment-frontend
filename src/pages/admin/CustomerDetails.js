import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/api";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await adminAPI.getCustomerById(id);
        setCustomer(data.customer || data);
      } catch (error) {
        console.error("Failed to fetch customer", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading customer details...</p>;
  }

  if (!customer) {
    return <p style={{ padding: "2rem" }}>Customer not found</p>;
  }

  return (
    <div className="admin-customer-details">
      <div className="page-header">
        <div className="header-content">
          <h1>Customer Details</h1>
          <p className="subtitle">Management view for {customer.name}</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/customers")}
        >
          Back to Customers
        </button>
      </div>

      <div className="data-card" style={{ padding: "2rem" }}>
        <p>
          <strong>Name:</strong> {customer.name}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone || "N/A"}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(customer.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CustomerDetails;
