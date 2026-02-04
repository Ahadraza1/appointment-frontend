
import React from 'react';
import './Dashboard.css';

const CompanyAdmins = () => {
  // Mock Data
  const admins = [
    { id: 1, name: 'Alice Smith', email: 'alice@acme.com', created: '2023-10-12', company: 'Acme Corp' },
    { id: 2, name: 'Bob Jones', email: 'bob@globex.com', created: '2023-11-05', company: 'Globex Inc' },
    { id: 3, name: 'Charlie Day', email: 'charlie@soylent.com', created: '2023-12-01', company: 'Soylent Corp' },
    { id: 4, name: 'Dana White', email: 'dana@initech.com', created: '2024-01-15', company: 'Initech' },
    { id: 5, name: 'Eve Black', email: 'eve@umbrella.com', created: '2024-01-20', company: 'Umbrella Corp' },
    { id: 6, name: 'Frank Green', email: 'frank@acme.com', created: '2024-02-01', company: 'Acme Corp' },
  ];

  const getInitials = (name) => name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="admin-page animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Admins</h1>
          <p className="text-gray-500 mt-1">List of all administrators managing company accounts</p>
        </div>
        <div>
            {/* No actions required as per spec (Read Only) */}
        </div>
      </div>

      <div className="data-card">
        <div className="card-header flex justify-between items-center">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search admins or emails..." 
                    className="form-input pl-10 py-2 text-sm w-64"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </div>

        <div className="table-container">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Admin Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                  <td className="py-4 px-4" data-label="Admin Name">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {getInitials(admin.name)}
                        </div>
                        <span className="font-medium text-gray-900">{admin.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600" data-label="Email">{admin.email}</td>
                  <td className="py-4 px-4" data-label="Company">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {admin.company}
                      </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm" data-label="Created At">{admin.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
         <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
           <span className="text-sm text-gray-500">Showing 1 to 6 of 6 entries</span>
           <div className="flex gap-1">
             <button className="btn btn-outline btn-sm" disabled>Prev</button>
             <button className="btn btn-outline btn-sm" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdmins;
