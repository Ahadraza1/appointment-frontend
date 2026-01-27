import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const FeatureItem = ({ text, included = true }) => (
  <li className={`feature-item ${!included ? 'muted' : ''}`}>
    <div className={`feature-icon-wrapper ${included ? 'check' : 'cross'}`}>
      {included ? (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </div>
    <span>{text}</span>
  </li>
);

const PricingCard = ({
  type,
  price,
  period,
  description,
  features,
  ctaText,
  redirectTo,
  isPremium = false,
  isPopular = false,
  disabled = false,
}) => (
  <div className={`pricing-card ${isPremium ? 'premium' : ''}`} tabIndex="0">
    {isPopular && <div className="popular-badge">Most Popular</div>}

    <div className="plan-header">
      <span className="plant-type">{type}</span>
      <div className="plan-price-block">
        <span className="plan-currency">$</span>
        <span className="plan-amount">{price}</span>
        <span className="plan-period">/{period}</span>
      </div>
      <p className="plan-description">{description}</p>
    </div>

    <ul className="feature-list">
      {features.map((feature, idx) => (
        <FeatureItem key={idx} text={feature.text} included={feature.included} />
      ))}
    </ul>

    {!disabled && (
      <Link to={redirectTo} className="pricing-cta">
        {ctaText}
      </Link>
    )}

    {disabled && (
      <div className="pricing-cta disabled">
        Current Plan
      </div>
    )}

    <p className="trust-hint">
      {isPremium ? 'Cancel anytime • 14 day refund' : 'No credit card required'}
    </p>
  </div>
);

const Pricing = () => {
  // ✅ assumed user data from login
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const currentPlan = user.planType; // free | monthly | yearly

  const priceData = {
    free: {
      type: "Free Starter",
      price: "0",
      period: "month",
      description: "Perfect for individuals just getting started with online scheduling.",
      features: [
        { text: "Up to 10 bookings", included: true },
        { text: "Basic service catalog", included: true },
        { text: "Email notifications", included: true },
        { text: "Custom branding", included: false },
        { text: "Priority support", included: false }
      ],
      ctaText: "Start for Free",
      redirectTo: "/customer/home",
      disabled: currentPlan === "free",
    },
    proMonthly: {
      type: "Pro Monthly",
      price: "39",
      period: "month",
      description: "Ideal for growing businesses that prefer monthly flexibility.",
      features: [
        { text: "Unlimited bookings", included: true },
        { text: "Advance analytics dashboard", included: true },
        { text: "SMS & Email notifications", included: true },
        { text: "Full custom branding", included: true },
        { text: "24/7 Priority support", included: true }
      ],
      ctaText: "Get Pro Monthly",
      redirectTo: "/checkout?plan=monthly",
      isPremium: true,
      disabled: currentPlan === "monthly" || currentPlan === "yearly",
    },
    professional: {
      type: "Professional",
      price: "399",
      period: "year",
      description: "Our most advanced features for established teams and businesses.",
      features: [
        { text: "Unlimited bookings", included: true },
        { text: "Advance analytics dashboard", included: true },
        { text: "SMS & Email notifications", included: true },
        { text: "Full custom branding", included: true },
        { text: "24/7 Priority support", included: true }
      ],
      ctaText: "Upgrade to Professional",
      redirectTo: "/checkout?plan=yearly",
      isPremium: true,
      isPopular: true,
      disabled: currentPlan === "yearly",
    }
  };

  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <div className="section-badge">Flexible Plans</div>
        <h1 className="pricing-title">Simple, Transparent Pricing</h1>
        {currentPlan && (
          <div className="current-plan-banner">
            <span className="status-dot"></span>
            <span className="status-label">Current Status:</span>
            <span className="status-value">{currentPlan.toUpperCase()} TIER</span>
          </div>
        )}
      </header>

      <div className="pricing-grid">
        {currentPlan !== "monthly" && <PricingCard {...priceData.free} />}
        {currentPlan !== "yearly" && <PricingCard {...priceData.proMonthly} />}
        <PricingCard {...priceData.professional} />
      </div>
    </div>
  );
};

export default Pricing;
