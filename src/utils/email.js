// src/utils/email.js
import emailjs from "emailjs-com";

const SERVICE_ID = "service_675u71p";
const PUBLIC_KEY = "Sh4xKvOjWnDlLZeNX";

export const sendCustomerEmail = (data) => {
  return emailjs.send(
    SERVICE_ID,
    "template_6jmneel",
    {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      service_name: data.service_name,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      booking_id: data.booking_id,
    },
    PUBLIC_KEY
  );
};

export const sendAdminEmail = (data) => {
  return emailjs.send(
    SERVICE_ID,
    "template_phe0fxc",
    {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      service_name: data.service_name,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      booking_id: data.booking_id,
    },
    PUBLIC_KEY
  );
};
