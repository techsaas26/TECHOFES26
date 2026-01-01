import MerchOrder from "../models/MerchOrder.js";
import User from "../models/User.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ Purchase Merchandise (Login Required)
// -----------------------------
export const purchaseMerchandise = async (req, res, next) => {
  try {
    const { purchaseType, sizes } = req.body;
    const user = req.user; // from userExtractor

    if (!purchaseType || !sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ error: "Invalid purchase data" });
    }

    // Calculate total shirts
    const totalShirts = sizes.reduce((sum, item) => sum + item.quantity, 0);
    let totalAmount;

    switch (purchaseType) {
      case "SINGLE_SHIRT":
        if (totalShirts !== 1)
          return res.status(400).json({ error: "SINGLE_SHIRT must contain exactly 1 shirt" });
        totalAmount = 180;
        break;
      case "FIVE_SHIRT_COMBO":
        if (totalShirts !== 5)
          return res.status(400).json({ error: "FIVE_SHIRT_COMBO must contain exactly 5 shirts" });
        totalAmount = 900;
        break;
      case "SHIRT_TICKET_COMBO":
        if (totalShirts !== 1)
          return res.status(400).json({ error: "SHIRT_TICKET_COMBO must contain exactly 1 shirt" });
        totalAmount = 300;
        break;
      default:
        return res.status(400).json({ error: "Invalid purchase type" });
    }

    // Create merchandise order (payment not done yet)
    const merch = await MerchOrder.create({
      user: user._id,
      purchaseType,
      sizes,
      totalItems: totalShirts,
      totalAmount,
      paymentStatus: "PENDING",
    });

    // ---------------- Razorpay Order ----------------
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // in paise
      currency: "INR",
      receipt: `merch_${merch._id}_${user._id}`,
    });

    res.status(201).json({
      message: "Merchandise order created",
      merch,
      razorpayOrder: order,
    });
  } catch (err) {
    logger.error(`purchaseMerchandise error: ${err.stack}`);
    next(err);
  }
};

// -----------------------------
// 2️⃣ Get all purchases (Admin)
// -----------------------------
export const getAllMerchPurchases = async (req, res, next) => {
  try {
    const { rollNo, size, comboType, T_ID, name } = req.query;
    let filter = {};

    if (rollNo) {
      const user = await User.findOne({ rollNo });
      if (!user) return res.status(404).json({ error: "User not found" });
      filter.user = user._id;
    }

    if (size) filter["sizes.size"] = size;

    if (comboType) {
      filter.is_combo = true;
      filter.combo_type = comboType;
    }

    if (T_ID) {
      const user = await User.findOne({ T_ID });
      if (!user) return res.status(404).json({ error: "User not found" });
      filter.user = user._id;
    }

    if (name) {
      const regex = new RegExp(name, "i");
      const users = await User.find({ $or: [{ firstName: regex }, { lastName: regex }] });
      const userIds = users.map((u) => u._id);
      filter.user = { $in: userIds };
    }

    const purchases = await MerchOrder.find(filter).populate("user", "T_ID rollNo firstName lastName");
    res.status(200).json(purchases);
  } catch (err) {
    next(err);
  }
};
