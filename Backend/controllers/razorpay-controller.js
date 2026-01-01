import crypto from "crypto";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import MerchOrder from "../models/MerchOrder.js";
import Accommodation from "../models/Accommodation.js";
import logger from "../utils/logger.js";

/**
 * Razorpay Webhook Handler
 * Handles payments for:
 *  - Event registrations
 *  - Merchandise orders
 *  - Accommodation bookings
 * Only accepts requests from Razorpay (verified via signature)
 */
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body; // raw body from express.raw

    // ---------------- 1️⃣ Verify signature ----------------
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
    if (signature !== expected) {
      logger.warn("Invalid Razorpay webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const payload = JSON.parse(body.toString());


    // Only handle successful payments
    if (payload.event !== "payment.captured") return res.status(200).send("Ignored");

    const payment = payload.payload.payment.entity;

    // Expected receipt format: <type>_<itemId>_<userId>
    const [type, itemId, userId] = payment.order_id.split("_");
    const user = await User.findById(userId);
    if (!user) return res.status(200).send("Invalid user");

    // ---------------- 2️⃣ Handle payment by type ----------------
    switch (type) {
      case "event": {
        const event = await Event.findById(itemId);
        if (!event || !event.isPaid) return res.status(200).send("Invalid event");

        if (payment.amount !== event.fee * 100) {
          logger.error(`Amount mismatch for event | T_ID=${user.T_ID}`);
          return res.status(200).send("Amount mismatch");
        }

        // Prevent duplicate registration
        const existingReg = await Registration.findOne({ user: user._id, event: event._id });
        if (existingReg) return res.status(200).send("Already registered");

        await Registration.create({
          user: user._id,
          event: event._id,
          paymentStatus: "SUCCESS",
          amountPaid: payment.amount / 100,
          transactionId: payment.id,
        });
        break;
      }

      case "merch": {
        const merch = await MerchOrder.findById(itemId);
        if (!merch) return res.status(200).send("Invalid merch order");
        if (merch.paymentStatus === "SUCCESS") return res.status(200).send("Already paid");

        if (payment.amount !== merch.totalAmount * 100) {
          logger.error(`Merch amount mismatch | T_ID=${user.T_ID}`);
          return res.status(200).send("Amount mismatch");
        }

        merch.paymentStatus = "SUCCESS";
        merch.amountPaid = payment.amount / 100;
        merch.transactionId = payment.id;
        await merch.save();
        break;
      }

      case "accom": {
        const accom = await Accommodation.findById(itemId);
        if (!accom) return res.status(200).send("Invalid accommodation");
        if (accom.paymentStatus === "SUCCESS") return res.status(200).send("Already paid");

        if (payment.amount !== accom.paymentAmount * 100) {
          logger.error(`Accommodation amount mismatch | T_ID=${user.T_ID}`);
          return res.status(200).send("Amount mismatch");
        }

        accom.paymentStatus = "SUCCESS";
        accom.amountPaid = payment.amount / 100;
        accom.transactionId = payment.id;
        await accom.save();
        break;
      }

      default:
        return res.status(200).send("Unknown type");
    }

    logger.info(`Payment recorded | T_ID=${user.T_ID} | type=${type}`);
    res.status(200).send("OK");

  } catch (err) {
    logger.error(`Razorpay webhook error: ${err.stack}`);
    res.status(500).send("Server error");
  }
};
