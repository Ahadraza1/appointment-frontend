import { sendAdminEmail, sendCustomerEmail, sendInvoiceEmail } from "../utils/email.js";


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
    customer_email: booking.email,
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
    customer_email: booking.email,
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
    customer_email: booking.email,
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
  // Admin
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

  // Customer
  await sendCustomerEmail({
    email_title: "Booking Cancelled",
    email_message:
      "Your booking has been cancelled successfully. If this was a mistake, please contact us.",
    customer_name: booking.name,
    customer_email: booking.email,
    service_name: booking.service,
    booking_date: booking.date,
    booking_time: booking.time,
    booking_id: booking.id,
  });
};

/* ===============================
   5️⃣ BOOKING RESCHEDULED
================================ */
export const bookingRescheduled = async (booking) => {
  await sendCustomerEmail({
    email_title: "Booking Rescheduled",
    email_message:
      "Your booking has been rescheduled. Please check the updated date and time.",
    customer_name: booking.name,
    customer_email: booking.email,
    service_name: booking.service,
    booking_date: booking.newDate,
    booking_time: booking.newTime,
    booking_id: booking.id,
  });
};


/* ===============================
   6️⃣ SEND INVOICE EMAIL
================================ */
export const sendInvoiceToCustomer = async (invoice) => {
  return sendInvoiceEmail({
    // 👤 customer
    customer_name: invoice.name,
    customer_email: invoice.email,

    // 🔑 FLAGS (VERY IMPORTANT)
    is_booking_email: false,
    is_invoice_email: true,

    // 🧾 INVOICE DATA (MATCH TEMPLATE NAMES)
    invoice_number: invoice.invoiceNumber,
    plan: invoice.plan,
    billing_cycle: invoice.billingCycle,
    amount: invoice.amount,
    transaction_id: invoice.transactionId,

    company_name: "BOOKME",
    current_year: new Date().getFullYear(),
  });
};

