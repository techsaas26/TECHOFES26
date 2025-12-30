import Merchandise from "../models/Merchandise.js";
import User from "../models/User.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ Purchase Merchandise
// -----------------------------
export const purchaseMerchandise = async (req, res, next) => {
  try {
    const { userId, sizes, is_combo, combo_type } = req.body;

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Calculate total items
    const totalShirts = sizes.reduce((sum, s) => sum + s.quantity, 0);
    let totalAmount = 0;

    if (is_combo) {
      if (combo_type === "shirt_plus_ticket") totalAmount = totalShirts * 300;
      else if (combo_type === "five_shirt_combo") totalAmount = 5 * 200; // ₹200 per shirt for 5-shirt combo
    } else {
      totalAmount = totalShirts * 200;
    }

    // Create Merchandise doc (not marked paid yet)
    const merch = await Merchandise.create({
      user: user._id,
      sizes,
      is_combo: !!is_combo,
      combo_type: combo_type || null,
      total_items: totalShirts,
      total_amount: totalAmount,
      is_paid: false,
    });

    // ---------------- Razorpay Order ----------------
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `merch_${merch._id}_${user._id}`,
    });

    res.status(201).json({
      message: "Merchandise order created successfully",
      merch,
      razorpayOrder: order,
    });
  } catch (err) {
    logger.error(`purchaseMerchandise error: ${err.stack}`);
    next(err);
  }
};

// -----------------------------
// 2️⃣ Get all purchases
// -----------------------------
export const getAllMerchPurchases = async (req, res, next) => {
  try {
    const purchases = await Merchandise.find().populate("user", "T_ID rollNo firstName lastName");
    res.status(200).json(purchases);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 3️⃣ Get purchase by roll number
// -----------------------------
export const getPurchaseByRoll = async (req, res, next) => {
  try {
    const { rollNo } = req.params;

    const user = await User.findOne({ rollNo });
    if (!user) return res.status(404).json({ error: "User not found" });

    const purchases = await Merchandise.find({ user: user._id });
    res.status(200).json(purchases);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 4️⃣ Get purchase by size
// -----------------------------
export const getPurchaseBySize = async (req, res, next) => {
  try {
    const { size } = req.params;

    // Find merchandise that contains this size in sizes array
    const purchases = await Merchandise.find({ "sizes.size": size }).populate("user", "T_ID rollNo");
    res.status(200).json(purchases);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 5️⃣ Get all purchases under particular combo
// -----------------------------
export const getPurchasesByCombo = async (req, res, next) => {
  try {
    const { comboType } = req.params;

    const purchases = await Merchandise.find({ is_combo: true, combo_type: comboType })
      .populate("user", "T_ID rollNo firstName lastName");
    res.status(200).json(purchases);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
