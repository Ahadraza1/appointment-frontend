import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SaaSToast from "../../components/common/SaaSToast";
import "./PaymentSuccess.css";

// ✅ EXISTING IMPORT (UNCHANGED)
import { sendInvoiceToCustomer } from "../../services/bookingEmailAction";

// ✅ NEW IMPORT (ONLY FOR PDF DOWNLOAD)
import html2pdf from "html2pdf.js";

const PaymentSuccess = () => {
  const location = useLocation();

  const {
    planName = "Professional",
    amount = "399",
    cycle = planName?.toLowerCase().includes("monthly") ? "Monthly" : "Yearly",
    invoiceNumber = null,
    userName = "",
    userEmail = "",
    transactionId = "",
  } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    SaaSToast.success({
      title: "Upgrade Successful 🎉",
      description:
        "Your plan has been upgraded. You now have access to unlimited bookings and premium features.",
    });
  }, []);

  // ✅ SEND INVOICE (UNCHANGED)
  const handleSendInvoice = async () => {
    try {
      if (!userEmail) {
        alert("User email not found. Please login again.");
        return;
      }

      if (!invoiceNumber) {
        alert("Invoice not available yet");
        return;
      }

      await sendInvoiceToCustomer({
        name: userName,
        email: userEmail,
        invoiceNumber,
        plan: planName,
        billingCycle: cycle,
        amount,
        transactionId,
      });

      alert("Invoice sent to your email successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to send invoice");
    }
  };

  // ✅ NEW: DIRECT PDF DOWNLOAD (NO PRINT DIALOG)
  const handleDownloadInvoicePDF = () => {
    const element = document.getElementById("invoice-pdf");

    const options = {
      margin: 10,
      filename: `Invoice-${invoiceNumber || "BOOKME"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <header className="success-hero">
          <div className="success-icon-wrapper">
            <svg
              className="success-tick"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="success-title">Payment Successful! 🎉</h1>
          <p className="success-subtitle">
            Your subscription has been activated successfully.
          </p>
        </header>

        {/* ✅ ONLY CHANGE: added id for PDF */}
        <div className="success-card" id="invoice-pdf">
          <div className="success-card-header">
            <h3>Subscription Summary</h3>
          </div>
          <div className="success-card-body">
            <div className="summary-row">
              <span className="label">Plan</span>
              <span className="value">{planName}</span>
            </div>
            <div className="summary-row">
              <span className="label">Billing Cycle</span>
              <span className="value">{cycle}</span>
            </div>
            <div className="summary-row">
              <span className="label">Amount Paid</span>
              <span className="value">${amount}</span>
            </div>
            <div className="summary-row">
              <span className="label">Status</span>
              <span className="value status-active">Active</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row transaction">
              <span className="label">Transaction ID</span>
              <span className="value">
                {transactionId || `TXN_BOOK_${Math.floor(Math.random() * 1000000)}`}
              </span>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/dashboard" className="btn-dashboard">
            Go to Dashboard
          </Link>

          {/* ✅ EXISTING BUTTON (UNCHANGED) */}
          <button className="btn-invoice" onClick={handleSendInvoice}>
            Send Invoice
          </button>

          {/* ✅ UPDATED: DIRECT PDF DOWNLOAD */}
          <button className="btn-invoice" onClick={handleDownloadInvoicePDF}>
            Download Invoice (PDF)
          </button>
        </div>

        <footer className="success-footer">
          <p>
            Need help? <Link to="/contact">Contact support anytime.</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentSuccess;
