
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Reusing existing dashboard styles

const SuperAdminDashboard = () => {
  // Mock Data for UI Demonstration
  const stats = {
    totalCompanies: 124,
    activeCompanies: 112,
    inactiveCompanies: 12,
    totalAdmins: 342,
    totalAppointments: 14502
  };

  return (
    <div className="admin-dashboard animate-fade-in">
      {/* Page Header */}
      <div className="dashboard-header mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your platform's performance</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary btn-sm">
            <span>Filter</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
          <button className="btn btn-primary btn-sm">
            <span>Export Report</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Companies */}
        <div className="stat-card bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="stat-icon bg-blue-50 text-blue-600 p-3 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"/>
                <path d="M5 21V7l8-4 8 4v14"/>
                <path d="M17 21v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V21"/>
              </svg>
            </div>
            <span className="badge badge-success flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +12%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Companies</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCompanies}</h3>
        </div>

        {/* Active vs Inactive */}
        <div className="stat-card bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="stat-icon bg-green-50 text-green-600 p-3 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500">Active Companies</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeCompanies}</h3>
            <span className="text-sm text-gray-400 mb-1">/ {stats.inactiveCompanies} Inactive</span>
          </div>
        </div>

        {/* Total Admins */}
        <div className="stat-card bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="stat-icon bg-indigo-50 text-indigo-600 p-3 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Admins</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalAdmins}</h3>
        </div>

        {/* Total Appointments */}
        <div className="stat-card bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="stat-icon bg-purple-50 text-purple-600 p-3 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span className="badge badge-success flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +8.5%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Appointments</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalAppointments.toLocaleString()}</h3>
        </div>
      </div>
      
      {/* Quick Actions / Getting Started */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header flex justify-between items-center">
             <h3 className="card-title">Platform Activity</h3>
             <select className="form-select text-sm h-8 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This Year</option>
             </select>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg bg-gray-50">
             <div className="text-center text-gray-400">
               <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
               </svg>
               <p>Activity Chart Placeholder</p>
               <p className="text-xs">(Charts disabled for initial release)</p>
             </div>
          </div>
        </div>

        <div className="card">
           <div className="card-header">
             <h3 className="card-title">Recent Companies</h3>
           </div>
           <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    C{i}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">Company {i}</h4>
                    <p className="text-xs text-gray-500">Joined 2 days ago</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              ))}
              <Link to="/admin/companies" className="btn btn-outline btn-sm w-full mt-4">View All Companies</Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
