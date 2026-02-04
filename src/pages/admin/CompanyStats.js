
import React from 'react';
import './Dashboard.css';

const CompanyStats = () => {
  // Mock Stats Data
  const stats = [
    { 
        label: 'Total Admins', 
        value: '342', 
        change: '+12%', 
        trend: 'up',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
               <circle cx="9" cy="7" r="4"></circle>
               <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        ),
        color: 'indigo'
    },
    { 
        label: 'Total Services Offered', 
        value: '1,893', 
        change: '+5.4%', 
        trend: 'up',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        ),
        color: 'green'
    },
    { 
        label: 'Total Appointments', 
        value: '14,502', 
        change: '+8.5%', 
        trend: 'up',
        icon: (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
        ),
        color: 'blue'
    },
     { 
        label: 'Platform Revenue', 
        value: '$1,240,500', 
        change: '+22.4%', 
        trend: 'up',
        icon: (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <line x1="12" y1="1" x2="12" y2="23"></line>
                 <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
             </svg>
        ),
        color: 'emerald'
    }
  ];

  return (
    <div className="admin-page animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Statistics</h1>
          <p className="text-gray-500 mt-1">Aggregated platform analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
             <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                        {stat.icon}
                    </div>
                    {stat.change && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {stat.change}
                        </span>
                    )}
                </div>
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
             </div>
        ))}
      </div>

      {/* Placeholder for heavier charts if requested later */}
      <div className="mt-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400">Detailed analytics charts will be available in future updates.</p>
      </div>
    </div>
  );
};

export default CompanyStats;
