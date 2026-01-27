import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './PaymentFailed.css';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    planName = 'Professional',
    amount = '399',
    cycle = planName?.toLowerCase().includes('monthly') ? 'Monthly' : 'Yearly'
  } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fail-page">
      <div className="fail-container">
        <header className="fail-hero">
          <div className="fail-icon-wrapper">
            <svg className="fail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="fail-title">Payment Failed</h1>
          <p className="fail-subtitle">We couldn’t process your payment this time.</p>
        </header>

        <div className="fail-card">
          <div className="fail-card-header">
            <h3>Transaction Summary</h3>
          </div>
          <div className="fail-card-body">
            <div className="summary-row">
              <span className="label">Selected Plan</span>
              <span className="value">{planName}</span>
            </div>
            <div className="summary-row">
              <span className="label">Billing Cycle</span>
              <span className="value">{cycle}</span>
            </div>
            <div className="summary-row">
              <span className="label">Amount Attempted</span>
              <span className="value">${amount}</span>
            </div>
            <div className="summary-row">
              <span className="label">Status</span>
              <span className="value status-failed">Unsuccessful</span>
            </div>
          </div>
        </div>

        <div className="fail-actions">
          <button className="btn-retry" onClick={() => navigate(-1)}>
            Retry Payment
          </button>
          <Link to="/pricing" className="btn-change-plan">
            Change Plan
          </Link>
        </div>

        <footer className="fail-footer">
          <p>
            If the amount was deducted, it will be automatically refunded within 5–7 business days.
          </p>
          <p className="support-link">
            Need help? <Link to="/contact">Contact Support</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentFailed;
