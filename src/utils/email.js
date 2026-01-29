import emailjs from "emailjs-com";

const SERVICE_ID = " service_675u71p";
const ADMIN_TEMPLATE_ID = "template_phe0fxc";
const CUSTOMER_TEMPLATE_ID = "template_6jmneel";
const PUBLIC_KEY = "Sh4xKvOjWnDlLZeNX";

/**
 * Send email to Admin (Customer → Admin)
 */
export const sendAdminEmail = async (data) => {
  return emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE_ID,
    {
      notification_title: data.notification_title,
      notification_message: data.notification_message,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      service_name: data.service_name || "N/A",
      booking_date: data.booking_date || "N/A",
      booking_time: data.booking_time || "N/A",
      booking_id: data.booking_id || "N/A",
      customer_message: data.customer_message || "-",
      company_name: "Your Company Name",
    },
    PUBLIC_KEY
  );
};

/**
 * Send email to Customer (Admin → Customer)
 */
export const sendCustomerEmail = async (data) => {
  return emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE_ID,
    {
      email_title: data.email_title,
      email_message: data.email_message,
      customer_name: data.customer_name,
      service_name: data.service_name,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      booking_id: data.booking_id,
      rejection_reason: data.rejection_reason || "",
      company_name: "Your Company Name",
      current_year: new Date().getFullYear(),
    },
    PUBLIC_KEY
  );
};
