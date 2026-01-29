import { sendAdminEmail, sendCustomerEmail } from "../utils/email.js";

/* ===============================
   1️⃣ BOOKING CREATED
================================ */
export const bookingCreated = async (booking) => {
  await sendAdminEmail({
    notification_title: "New Booking Created",
    notification_message: "A new booking has been created by a customer.",
    customer_name: booking.name,
    customer_email: booking.email,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });

  await sendCustomerEmail({
    email_title: "Booking Confirmation",
    email_message:
      "Your booking request has been received successfully. We will notify you once it is reviewed.",
    customer_name: booking.name,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });
};

/* ===============================
   2️⃣ BOOKING APPROVED
================================ */
export const bookingApproved = async (booking) => {
  await sendCustomerEmail({
    email_title: "Booking Approved",
    email_message:
      "Great news! Your booking has been approved. We look forward to serving you.",
    customer_name: booking.name,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });
};

/* ===============================
   3️⃣ BOOKING REJECTED
================================ */
export const bookingRejected = async (booking, reason) => {
  await sendCustomerEmail({
    email_title: "Booking Rejected",
    email_message:
      "Unfortunately, your booking request could not be approved.",
    rejection_reason: `Reason: ${reason}`,
    customer_name: booking.name,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });
};

/* ===============================
   4️⃣ BOOKING CANCELLED
================================ */
export const bookingCancelled = async (booking) => {
  await sendAdminEmail({
    notification_title: "Booking Cancelled",
    notification_message: "A booking has been cancelled by the customer.",
    customer_name: booking.name,
    customer_email: booking.email,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });
};

/* ===============================
   5️⃣ CONTACT US → ADMIN
================================ */
export const contactAdmin = async (form) => {
  await sendAdminEmail({
    notification_title: "New Contact Request",
    notification_message: "A new inquiry has been received from contact form.",
    customer_name: form.name,
    customer_email: form.email,
    customer_message: form.message,
  });
};
