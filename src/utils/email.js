import emailjs from "emailjs-com";

const SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.REACT_APP_ADMIN_TEMPLATE_ID;
const CUSTOMER_TEMPLATE_ID = process.env.REACT_APP_CUSTOMER_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

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
