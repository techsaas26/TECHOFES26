import crypto from "crypto";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import logger from "../utils/logger.js";
import razorpay from "../utils/pay.js";

// ---------------- Verify Payment ----------------
export const verifyPayment = async (req, res, next) => {
  try {
    const { order_id, payment_id, signature, eventId } = req.body;
    const T_ID = req.T_ID; // from userExtractor

    logger.info(`Verifying payment for user T_ID: ${T_ID}, eventId: ${eventId}`);

    if (!order_id || !payment_id || !signature || !eventId) {
      logger.warn(`Missing payment details for user T_ID: ${T_ID}`);
      return res.status(400).json({ error: "Missing payment details" });
    }

    // ---------------- 1. Verify signature ----------------
    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      logger.warn(`Invalid payment signature for user T_ID: ${T_ID}`);
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // ---------------- 2. Fetch payment details ----------------
    const payment = await razorpay.payments.fetch(payment_id);

    // ---------------- 3. Check event exists ----------------
    const event = await Event.findById(eventId);
    if (!event) {
      logger.warn(`Event not found: ${eventId}`);
      return res.status(404).json({ error: "Event not found" });
    }

    // ---------------- 4. Prevent duplicate registration ----------------
    const existingRegistration = await Registration.findOne({ T_ID, eventID: eventId });
    if (existingRegistration) {
      logger.warn(`User already registered: T_ID ${T_ID}, eventId ${eventId}`);
      return res.status(400).json({ error: "Already registered" });
    }

    // ---------------- 5. Verify payment amount ----------------
    const baseFee = event.price || 200; // base registration fee
    const gatewayPercent = 0.02;        // 2%
    const gstPercent = 0.18;            // 18%
    const expectedTotalCharge = Math.ceil(baseFee / (1 - gatewayPercent * (1 + gstPercent))) * 100; // in paise

    if (payment.amount !== expectedTotalCharge) {
      logger.warn(`Incorrect payment amount by user ${T_ID}. Paid: ${payment.amount}, Expected: ${expectedTotalCharge}`);
      return res.status(400).json({ error: "Incorrect payment amount" });
    }

    // ---------------- 6. Create registration ----------------
    const registration = await Registration.create({
      T_ID,
      eventID: eventId,
      eventname: event.title,
      isPaid: true,
      paymentId: payment_id,
      amountPaid: payment.amount / 100, // store in INR
    });

    logger.info(`Payment verified & registration created: T_ID ${T_ID}, eventId ${eventId}`);
    res.status(201).json({
      message: "Payment verified & registered successfully",
      registration,
    });

  } catch (err) {
    logger.error(`Error verifying payment: ${err.stack}`);
    next(err);
  }
};