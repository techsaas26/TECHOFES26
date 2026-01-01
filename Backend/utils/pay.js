import Razorpay from "razorpay";
import config from "./config.js";
import logger from "./logger.js";

const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const options = {
    amount,
    currency: currency || "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    logger.error("Razorpay create order failed", { message: err.message });
    res.status(500).json({ error: "Payment creation failed" });
  }
};

export default createOrder;
