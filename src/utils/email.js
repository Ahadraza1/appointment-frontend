import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN;
const CUSTOMER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_CUSTOMER;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

/* ===============================
   CUSTOMER → ADMIN (Template 1)
================================ */
export const sendAdminEmail = (payload) => {
  return emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE_ID,
    {
      notification_title: payload.notification_title,
      notification_message: payload.notification_message,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      service_name: payload.service_name || "N/A",
      booking_date: payload.booking_date || "N/A",
      booking_time: payload.booking_time || "N/A",
      booking_id: payload.booking_id || "N/A",
      customer_message: payload.customer_message || "-",
      company_name: "Your Company Name",
    },
    PUBLIC_KEY
  );
};

/* ===============================
   ADMIN → CUSTOMER (Template 2)
================================ */
export const sendCustomerEmail = (payload) => {
  return emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE_ID,
    {
      email_title: payload.email_title,
      email_message: payload.email_message,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      service_name: payload.service_name,
      booking_date: payload.booking_date,
      booking_time: payload.booking_time,
      booking_id: payload.booking_id,
      rejection_reason: payload.rejection_reason || "",
      company_name: "Your Company Name",
      current_year: new Date().getFullYear(),
    },
    PUBLIC_KEY
  );
};


/* ===============================
   CUSTOMER → INVOICE EMAIL
================================ */
export const sendInvoiceEmail = (payload) => {
  return emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE_ID, // SAME template
    {
      email_title: "Your Invoice",
      email_message: "Thank you for your payment. Below are your invoice details.",

      customer_name: payload.customer_name,
      customer_email: payload.customer_email,

      // 🔑 FLAGS (VERY IMPORTANT)
      is_booking_email: false,
      is_invoice_email: true,

      // 🧾 INVOICE DATA
      invoice_number: payload.invoice_number,
      plan: payload.plan,
      billing_cycle: payload.billing_cycle,
      amount: payload.amount,
      transaction_id: payload.transaction_id,

      company_name: "Your Company Name",
      current_year: new Date().getFullYear(),
    },
    PUBLIC_KEY
  );
};

/* ===============================
   SUPERADMIN → COMPANY ADMIN
   (Uses ADMIN TEMPLATE)
================================ */
export const sendSuperAdminToCompanyAdminEmail = (payload) => {
  if (!payload?.to_email) {
    console.error("Recipient email is required for admin email");
    return Promise.reject("Recipient email missing");
  }

  return emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE_ID,
    {
      notification_title: payload.notification_title || "Account Notification",
      notification_message: payload.notification_message || "",

      admin_name: payload.admin_name || "Admin",

      // 🔐 Credentials
      login_email: payload.login_email || "",
      login_password: payload.login_password || "",

      // 👇 Control sections in template
      credentials_section_style: payload.credentials_section_style || "",
      booking_section_style: payload.booking_section_style || "display:none;",

      footer_note: payload.footer_note || "",

      company_name: payload.company_name || "Your Company Name",

      to_email: payload.to_email,
    },
    PUBLIC_KEY
  );
};

