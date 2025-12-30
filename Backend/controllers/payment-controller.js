import crypto from "crypto";
import logger from "../utils/logger.js";

export const verifyPayment = async (req, res, next) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const { T_ID } = req;

    logger.info(`Verifying payment | T_ID=${T_ID} | orderId=${order_id}`);

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    /* ======================
       1. Verify Signature
    ====================== */
    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      logger.warn(`Invalid Razorpay signature | T_ID=${T_ID}`);
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    /* ======================
       2. Response for Frontend
       - DO NOT write to DB
       - Let webhook handle DB creation
    ====================== */
    logger.info(`Payment verified by frontend | T_ID=${T_ID} | orderId=${order_id}`);
    return res.status(200).json({
      message: "Payment verified on client side. Final registration will be confirmed via webhook.",
    });

  } catch (err) {
    logger.error(`verifyPayment error: ${err.stack}`);
    next(err);
  }
};
