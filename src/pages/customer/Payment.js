import React, { useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const API_BASE = process.env.REACT_APP_API_URL;

const OrderSummary = ({ plan, onChangePlan }) => (
  <div className="order-summary-card">
    <h2 className="summary-title">Order Summary</h2>

    <div className="summary-item plan-detail">
      <div className="plan-info">
        <span className="plan-name">{plan.name}</span>
        <span className="plan-cycle">{plan.cycle} billing</span>
      </div>
      <button className="change-plan-btn" onClick={onChangePlan}>
        Change Plan
      </button>
    </div>

    <div className="summary-divider"></div>

    <div className="summary-breakdown">
      <div className="summary-row">
        <span>Base Price</span>
        <span>${plan.basePrice}</span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>$0</span>
      </div>
    </div>

    <div className="summary-divider"></div>

    <div className="summary-total">
      <span>Total Payable</span>
      <span className="total-amount">${plan.total}</span>
    </div>
  </div>
);

const Payment = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const planType = query.get("plan");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const paypalRendered = useRef(false);

  const handleChangePlan = () => {
    navigate("/pricing");
  };

  const selectedPlan = useMemo(() => {
    if (planType === "monthly") {
      return {
        name: "Pro Monthly",
        cycle: "Monthly",
        basePrice: "39",
        total: "39",
      };
    }

    return {
      name: "Professional",
      cycle: "Yearly",
      basePrice: "399",
      total: "399",
    };
  }, [planType]);

  /* ================= PAYPAL SDK LOAD (SAFE) ================= */
  useEffect(() => {
    if (paypalRendered.current) return;
    paypalRendered.current = true;

    const renderButtons = () => {
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          createOrder: async () => {
            const res = await fetch(`${API_BASE}/payment/paypal/create-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                amount: selectedPlan.total,
              }),
            });
            const data = await res.json();
            return data.orderId;
          },

          onApprove: async (data) => {
            const res = await fetch(`${API_BASE}/payment/paypal/capture`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: data.orderID,
                planType: planType || "yearly",
                amount: selectedPlan.total,
              }),
            });

            const result = await res.json();

            if (result.success) {
              navigate("/payment-success", {
                state: {
                  planName: selectedPlan.name,
                  amount: selectedPlan.total,
                  cycle: selectedPlan.cycle,
                  invoiceNumber:
                    result.data?.invoiceNumber || result.invoiceNumber || null, // 🔒 SAFE
                },
              });
            } else {
              navigate("/payment-failed");
            }
          },

          onError: async (err) => {
            await fetch(`${API_BASE}/payment/failed`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                planType: planType || "yearly",
                amount: selectedPlan.total,
                failureReason: err.message,
              }),
            });

            navigate("/payment-failed");
          },
        })
        .render("#paypal-button-container");
    };

    if (window.paypal) {
      renderButtons();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = renderButtons;
      document.body.appendChild(script);
    }
  }, []); // 👈 VERY IMPORTANT (EMPTY)

  return (
    <div className="payment-page">
      <div className="payment-container">
        <main className="payment-main">
          <h1 className="payment-title">Complete your payment</h1>
          <div id="paypal-button-container"></div>
        </main>

        <aside className="payment-sidebar">
          <OrderSummary plan={selectedPlan} onChangePlan={handleChangePlan} />
        </aside>
      </div>
    </div>
  );
};

export default Payment;
