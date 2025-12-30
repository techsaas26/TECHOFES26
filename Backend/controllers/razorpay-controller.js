import crypto from "crypto";
import express from "express";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import MerchOrder from "../models/Merchandise.js";
import Accommodation from "../models/Accommodation.js";
import logger from "../utils/logger.js";

/* 
  This webhook handles:
  - Event registrations
  - Merchandise orders
  - Accommodation bookings
  Only trusted source: Razorpay.
*/

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body; // RAW body from express.raw

    // ---------------- 1. Verify signature ----------------
    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expected) {
      logger.warn("Invalid Razorpay webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const payload = JSON.parse(body);

    // Only handle captured payments
    if (payload.event !== "payment.captured") {
      return res.status(200).send("Ignored");
    }

    const payment = payload.payload.payment.entity;
    const receipt = payment.order_id.split("_"); 
    // Receipt format: <type>_<itemId>_<userId>
    const [type, itemId, userId] = receipt;

    const user = await User.findById(userId);
    if (!user) return res.status(200).send("Invalid user");

    // ---------------- 2. Handle each type ----------------
    if (type === "event") {
      const event = await Event.findById(itemId);
      if (!event || !event.isPaid) return res.status(200).send("Invalid event");

      // Amount validation
      if (payment.amount !== event.fee * 100) {
        logger.error(`Amount mismatch: T_ID=${user.T_ID}`);
        return res.status(200).send("Amount mismatch");
      }

      // Prevent duplicates
      const existing = await Registration.findOne({ user: user._id, event: event._id });
      if (existing) return res.status(200).send("Already registered");

      await Registration.create({
        user: user._id,
        event: event._id,
        paymentStatus: "SUCCESS",
        amountPaid: payment.amount / 100,
        transactionId: payment.id,
      });

    } else if (type === "merch") {
      const merch = await MerchOrder.findById(itemId);
      if (!merch) return res.status(200).send("Invalid merch order");

      // Prevent duplicate payment
      if (merch.paymentStatus === "SUCCESS") return res.status(200).send("Already paid");

      // Validate amount
      if (payment.amount !== merch.totalAmount * 100) {
        logger.error(`Merch amount mismatch: T_ID=${user.T_ID}`);
        return res.status(200).send("Amount mismatch");
      }

      merch.paymentStatus = "SUCCESS";
      merch.amountPaid = payment.amount / 100;
      merch.transactionId = payment.id;
      await merch.save();

    } else if (type === "accom") {
      const accom = await Accommodation.findById(itemId);
      if (!accom) return res.status(200).send("Invalid accommodation");

      if (accom.paymentStatus === "SUCCESS") return res.status(200).send("Already paid");

      if (payment.amount !== accom.paymentAmount * 100) {
        logger.error(`Accommodation amount mismatch: T_ID=${user.T_ID}`);
        return res.status(200).send("Amount mismatch");
      }

      accom.paymentStatus = "SUCCESS";
      accom.amountPaid = payment.amount / 100;
      accom.transactionId = payment.id;
      await accom.save();

    } else {
      return res.status(200).send("Unknown type");
    }

    logger.info(`Payment recorded successfully | T_ID=${user.T_ID} | type=${type}`);
    res.status(200).send("OK");

  } catch (err) {
    logger.error(`Webhook error: ${err.stack}`);
    res.status(500).send("Server error");
  }
};
