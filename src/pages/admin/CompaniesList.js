
import React, { useState } from 'react';
import './Dashboard.css'; // Utilizing shared dashboard styles

const CompaniesList = () => {
  // Mock Data
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Acme Corp', email: 'admin@acme.com', status: 'Active', created: '2023-10-12' },
    { id: 2, name: 'Globex Inc', email: 'contact@globex.com', status: 'Inactive', created: '2023-11-05' },
    { id: 3, name: 'Soylent Corp', email: 'info@soylent.com', status: 'Active', created: '2023-12-01' },
    { id: 4, name: 'Initech', email: 'support@initech.com', status: 'Active', created: '2024-01-15' },
    { id: 5, name: 'Umbrella Corp', email: 'secure@umbrella.com', status: 'Inactive', created: '2024-01-20' },
  ]);

  const toggleStatus = (id) => {
    setCompanies(companies.map(c => 
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-500 mt-1">Manage registered companies and their accounts</p>
        </div>
        <button className="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Company
        </button>
      </div>

      <div className="data-card">
        <div className="card-header flex justify-between items-center">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search companies..." 
                    className="form-input pl-10 py-2 text-sm w-64"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <div className="flex gap-2">
                <select className="form-select text-sm py-2">
                    <option>Status: All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>

        <div className="table-container">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Company Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Created Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600 bg-gray-50 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                  <td className="py-4 px-4" data-label="Company Name">
                    <div className="font-medium text-gray-900">{company.name}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-600" data-label="Email">{company.email}</td>
                  <td className="py-4 px-4" data-label="Status">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      company.status === 'Active' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm" data-label="Created Date">{company.created}</td>
                  <td className="py-4 px-4 text-right" data-label="Actions">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                         className="btn-icon text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                         title="View Admins"
                      >
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                           <circle cx="9" cy="7" r="4"></circle>
                         </svg>
                      </button>
                      <button 
                         className="btn-icon text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                         title="View Stats"
                      >
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <line x1="18" y1="20" x2="18" y2="10"></line>
                           <line x1="12" y1="20" x2="12" y2="4"></line>
                           <line x1="6" y1="20" x2="6" y2="14"></line>
                         </svg>
                      </button>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <div 
                        className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${company.status === 'Active' ? 'bg-blue-600' : 'bg-gray-200'}`}
                        onClick={() => toggleStatus(company.id)}
                        role="button"
                        title={company.status === 'Active' ? 'Disable' : 'Enable'}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${company.status === 'Active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
           <span className="text-sm text-gray-500">Showing 1 to 5 of 5 entries</span>
           <div className="flex gap-1">
             <button className="btn btn-outline btn-sm" disabled>Prev</button>
             <button className="btn btn-outline btn-sm" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
