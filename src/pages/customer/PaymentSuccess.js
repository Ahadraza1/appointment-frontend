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
    const originalElement = document.getElementById("invoice-pdf");
    
    // Clone the element to manipulate it for PDF generation without affecting the UI
    const element = originalElement.cloneNode(true);
    
    // Create a hidden container to hold the clone
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    // Set a fixed width that looks good on A4 (approx 794px at 96dpi, or just a comfortable desktop width)
    container.style.width = '800px'; 
    container.appendChild(element);
    document.body.appendChild(container);

    // Apply specific styles for the PDF version if needed
    element.style.maxWidth = 'none';
    element.style.width = '100%';
    element.style.margin = '0';
    element.style.boxShadow = 'none';
    element.style.border = 'none';

    const options = {
      margin: 10,
      filename: `Invoice-${invoiceNumber || "BOOKME"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
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
                <div className="invoice-logo-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <path d="M7.5 4.21l4.5 2.6 4.5-2.6"></path>
                    <path d="M7.5 19.79l4.5-2.6 4.5 2.6"></path>
                    <line x1="12" y1="9" x2="12" y2="15"></line>
                  </svg>
                </div>
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
