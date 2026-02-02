import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SaaSToast from "../../components/common/SaaSToast";
import "./PaymentSuccess.css";

import { sendInvoiceToCustomer } from "../../services/bookingEmailAction";
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

        {/* ================= INVOICE PDF CONTENT ================= */}
        <div className="invoice-container" id="invoice-pdf">
          {/* ===== INVOICE HEADER ===== */}
          <div className="invoice-header">
            <div className="invoice-brand">
              <div className="brand-logo-wrapper">
                {/* Placeholder logo if image fails, or use text if preferred, sticking to image as per existing code */}
                <img src="/logo.png" alt="BOOKME" className="brand-logo" />
              </div>
              <h1 className="brand-name">BOOKME</h1>
            </div>

            <div className="invoice-meta">
              <div className="meta-group">
                <span className="meta-label">Invoice Number</span>
                <span className="meta-value">#{invoiceNumber}</span>
              </div>
              <div className="meta-group">
                <span className="meta-label">Date</span>
                <span className="meta-value">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* ===== INVOICE BODY ===== */}
          <div className="invoice-body">
            <h2 className="section-category">Subscription Summary</h2>

            <div className="invoice-table">
              <div className="invoice-row">
                <span className="invoice-label">Plan</span>
                <span className="invoice-value">{planName}</span>
              </div>
              <div className="invoice-row">
                <span className="invoice-label">Billing Cycle</span>
                <span className="invoice-value">{cycle}</span>
              </div>
              <div className="invoice-row">
                <span className="invoice-label">Amount Paid</span>
                <span className="invoice-value highlight">${amount}</span>
              </div>
              <div className="invoice-row">
                <span className="invoice-label">Status</span>
                <span className="invoice-status status-pill">Active</span>
              </div>
            </div>

            <div className="invoice-footer-meta">
              <span className="meta-label">Transaction ID</span>
              <span className="meta-id">
                {transactionId ||
                  `TXN_BOOK_${Math.floor(Math.random() * 1000000)}`}
              </span>
            </div>
          </div>

          {/* ===== INVOICE FOOTER ===== */}
          <div className="invoice-footer">
            <div className="footer-line"></div>
            <div className="footer-content">
              <p className="company-name">
                BOOKME · Online Appointment Booking Platform
              </p>
              <p className="support-info">
                support@bookme.com · www.bookme.com
              </p>
              <p className="copyright">
                © {new Date().getFullYear()} BOOKME. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="success-actions">
          <Link to="/dashboard" className="btn-dashboard">
            Go to Dashboard
          </Link>

          <button className="btn-invoice" onClick={handleSendInvoice}>
            Send Invoice
          </button>

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
