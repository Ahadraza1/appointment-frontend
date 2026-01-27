import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [filterStatus]);

 const fetchServices = async () => {
  try {
    setLoading(true);

    const response = await servicesAPI.getPublic();
      

    setServices(response.services || []);
  } catch (err) {
    console.error("Error:", err);
    setServices([]);
  } finally {
    setLoading(false);
  }
};


  const handleBookClick = (serviceId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/book/${serviceId}` } });
    } else {
      navigate(`/book/${serviceId}`);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const filteredServices = services.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    return service.name?.toLowerCase().includes(searchLower) || 
           service.description?.toLowerCase().includes(searchLower);
  });

  if (loading) {
    return (
      <div className="services-page">
        <div className="services-header">
          <div className="container">
            <h1 className="services-header-title">Our Services</h1>
            <p className="services-header-description">
              Browse our professional services and book your appointment today
            </p>
          </div>
        </div>
        <div className="services-content">
          <div className="container">
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* HERO SECTION: Branding and Context Only */}
      <section className="services-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Services</h1>
            <p className="hero-description">
              Precision booking for professional results. Access our full catalog of specialized units and scheduled services.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE TOOLBAR: Functional Control Panel */}
      <div className="services-toolbar-wrapper">
        <div className="container">
          <div className="services-toolbar">
            <div className="toolbar-registry">
              <span className="registry-label">REGISTRY</span>
              <span className="registry-count">{services.length} Units Available</span>
            </div>
            
            <div className="toolbar-filters">
              <div className="filter-tabs">
                <button 
                  className="tab-btn active"
                  style={{ cursor: 'default' }}
                >
                  All Services
                </button>
              </div>
            </div>

            <div className="toolbar-actions">
              <div className="search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="search-icon">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search services..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SERVICE LISTING: Clean Registry Grid */}
      <div className="services-listing-wrapper">
        <div className="container">
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 'var(--spacing-6)' }}>
              {error}
            </div>
          )}

          {(!Array.isArray(services) || services.length === 0) ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3 className="empty-state-title">No Services Available</h3>
              <p className="empty-state-text">
                Services will be listed here once they're added by the administrator.
              </p>
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map((service, index) => (
                <div key={service._id} className="service-card" style={{ '--card-index': index }}>
                  <div className="service-card-image">
                    <div className="grid-overlay"></div>
                    <div className="service-icon-container">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                      </svg>
                    </div>
                    <div className="service-unit-tag">UNIT_{service._id?.slice(-4).toUpperCase()}</div>
                  </div>
                  <div className="service-card-body">
                    <div className="service-type-label">SERVICE UNIT</div>
                    <h3 className="service-card-title">{service.name}</h3>
                    <p className="service-card-description">
                      {service.description || 'Precision professional service with industrial-grade standards.'}
                    </p>
                    
                    <div className="service-specs">
                      <div className="spec-item">
                        <span className="spec-label">EST. DURATION</span>
                        <span className="spec-value">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {formatDuration(service.duration)}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">AVAILABILITY</span>
                        <span className="spec-value status-active">ONLINE</span>
                      </div>
                    </div>

                    <div className="service-card-footer">
                      <div className="price-block">
                        <span className="price-label">FIXED RATE</span>
                        <div className="service-price">
                          {formatPrice(service.price)}
                        </div>
                      </div>
                      <button 
                        className="service-book-btn"
                        onClick={() => handleBookClick(service._id)}
                      >
                        BOOK NOW
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
