import React from 'react';
import toast from 'react-hot-toast';
import './SaaSToast.css';

/**
 * Premium SaaS-style Toast Notifications
 */

// Helper to generate consistent IDs
const getToastId = (title, providedId) => {
  if (providedId) return providedId;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const SaaSToast = {
  /**
   * Limit Reached Variant
   * @param {Object} options - { title, description, actionLabel, onAction, id }
   */
  limitReached: ({ 
    title = "Booking Limit Reached", 
    description = "You’ve reached the free plan limit. Upgrade to unlock unlimited bookings.", 
    actionLabel = "Upgrade Now",
    onAction = () => {},
    id
  }) => {
    return toast.custom((t) => (
      <div className={`saas-toast-wrapper ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="saas-toast limit-reached">
          <div className="toast-content">
            <div className="toast-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
              </svg>
            </div>
            <div className="toast-text">
              <h4 className="toast-title">{title}</h4>
              <p className="toast-desc">{description}</p>
            </div>
          </div>
          <div className="toast-actions">
            <button 
              className="toast-action-btn"
              onClick={() => {
                onAction();
                toast.dismiss(t.id);
              }}
            >
              {actionLabel}
            </button>
            <button 
              className="toast-close-btn"
              onClick={() => toast.dismiss(t.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="toast-progress-bar"></div>
        </div>
      </div>
    ), {
      duration: 5000,
      id: getToastId(title, id),
    });
  },

  /**
   * Warning Variant (Last Booking)
   * @param {Object} options - { title, description, actionLabel, onAction, id }
   */
  warning: ({ 
    title = "Last Booking Remaining", 
    description = "You’re almost at your plan limit. Upgrade now to continue booking without interruption.", 
    actionLabel = "Upgrade Plan",
    onAction = () => {},
    id
  }) => {
    return toast.custom((t) => (
      <div className={`saas-toast-wrapper ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="saas-toast warning">
          <div className="toast-content">
            <div className="toast-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="toast-text">
              <h4 className="toast-title">{title}</h4>
              <p className="toast-desc">{description}</p>
            </div>
          </div>
          <div className="toast-actions">
            {actionLabel && (
              <button 
                className="toast-action-btn"
                onClick={() => {
                  onAction();
                  toast.dismiss(t.id);
                }}
              >
                {actionLabel}
              </button>
            )}
            <button 
              className="toast-close-btn"
              onClick={() => toast.dismiss(t.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="toast-progress-bar"></div>
        </div>
      </div>
    ), {
      duration: 6000,
      id: getToastId(title, id),
    });
  },

  /**
   * Success Variant (Upgrade Celebration)
   * @param {Object} options - { title, description, id }
   */
  success: ({ 
    title = "Upgrade Successful 🎉", 
    description = "Your plan has been upgraded. You now have access to unlimited bookings and premium features.", 
    id
  }) => {
    return toast.custom((t) => (
      <div className={`saas-toast-wrapper ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="saas-toast success">
          <div className="toast-content">
            <div className="toast-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="toast-text">
              <h4 className="toast-title">{title}</h4>
              <p className="toast-desc">{description}</p>
            </div>
          </div>
          <button 
            className="toast-close-btn"
            onClick={() => toast.dismiss(t.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="toast-progress-bar"></div>
        </div>
      </div>
    ), {
      duration: 5000,
      id: getToastId(title, id),
    });
  },

  /**
   * Plan Expired Variant (Hard Stop)
   * @param {Object} options - { title, description, actionLabel, onAction, id }
   */
  planExpired: ({ 
    title = "Plan Expired", 
    description = "Your current plan has expired. Please upgrade to continue booking services.", 
    actionLabel = "Upgrade Plan",
    onAction = () => {},
    id
  }) => {
    return toast.custom((t) => (
      <div className={`saas-toast-wrapper ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="saas-toast expired">
          <div className="toast-content">
            <div className="toast-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="toast-text">
              <h4 className="toast-title">{title}</h4>
              <p className="toast-desc">{description}</p>
            </div>
          </div>
          <div className="toast-actions">
            <button 
              className="toast-action-btn"
              onClick={() => {
                onAction();
                toast.dismiss(t.id);
              }}
            >
              {actionLabel}
            </button>
            <button 
              className="toast-close-btn"
              onClick={() => toast.dismiss(t.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="toast-progress-bar"></div>
        </div>
      </div>
    ), {
      duration: 8000, // Longer duration for hard stops
      id: getToastId(title, id),
    });
  },

  /**
   * Error Variant (Slot Booked/Unavailable)
   * @param {Object} options - { title, description, id }
   */
  error: ({ 
    title = "Slot Unavailable", 
    description = "This time slot is no longer available. Please select a different time to continue.", 
    id
  }) => {
    return toast.custom((t) => (
      <div className={`saas-toast-wrapper ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
        <div className="saas-toast error">
          <div className="toast-content">
            <div className="toast-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="toast-text">
              <h4 className="toast-title">{title}</h4>
              <p className="toast-desc">{description}</p>
            </div>
          </div>
          <button 
            className="toast-close-btn"
            onClick={() => toast.dismiss(t.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="toast-progress-bar"></div>
        </div>
      </div>
    ), {
      duration: 4000,
      id: getToastId(title, id),
    });
  }
};

export default SaaSToast;
