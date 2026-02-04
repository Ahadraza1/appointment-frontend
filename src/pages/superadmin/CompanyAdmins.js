import React from "react";
import "./CompanyAdmins.css";

const CompanyAdmins = () => {
  // Dummy data (API baad me connect hogi)
  const admins = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@abcsalon.com",
      createdAt: "2024-01-12",
    },
    {
      id: "2",
      name: "Neha Verma",
      email: "neha@abcsalon.com",
      createdAt: "2024-02-03",
    },
  ];

  return (
    <div className="sa-company-admins">
      <h1 className="sa-page-title">Company Admins</h1>

      <div className="sa-table-wrapper">
        <table className="sa-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyAdmins;
