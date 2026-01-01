import Accommodation from "../models/Accommodation.js";
import User from "../models/User.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ Request accommodation (payment included)
// -----------------------------
export const requestAccommodation = async (req, res, next) => {
  try {
    const { gender, noOfNights } = req.body;
    const user = req.user; // populated by userExtractor middleware

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    // Check if already requested
    const existing = await Accommodation.findOne({ user: user._id });
    if (existing)
      return res.status(400).json({ error: "Accommodation already requested" });

    // Payment calculation
    const paymentAmount = noOfNights * 300; // ₹300 per night

    // Razorpay order
    const order = await razorpay.orders.create({
      amount: paymentAmount * 100, // paise
      currency: "INR",
      receipt: `accom_${user._id}`,
      notes: { userId: user._id.toString(), gender, noOfNights },
    });

    // Create Accommodation doc (unpaid initially)
    const accommodation = await Accommodation.create({
      user: user._id,
      gender,
      noOfNights,
      paymentAmount,
      paymentStatus: "PENDING",
    });

    logger.info(
      `Accommodation request created | User=${user.T_ID} | Order=${order.id}`
    );

    res.status(201).json({
      message: "Accommodation request created. Payment required",
      accommodation,
      razorpayOrder: order,
    });
  } catch (err) {
    logger.error(`requestAccommodation error: ${err.stack}`);
    next(err);
  }
};

// -----------------------------
// 2️⃣ Get all accommodations (with query filters)
// -----------------------------
export const getAllAccommodations = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.rollNo) {
      const user = await User.findOne({ rollNo: req.query.rollNo });
      if (!user) return res.status(404).json({ error: "User not found" });
      filter.user = user._id;
    }

    if (req.query.gender) filter.gender = req.query.gender.toUpperCase();
    if (req.query.paymentStatus)
      filter.paymentStatus = req.query.paymentStatus.toUpperCase();

    const accommodations = await Accommodation.find(filter).populate(
      "user",
      "T_ID rollNo firstName lastName"
    );

    res.status(200).json(accommodations);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 3️⃣ Delete an accommodation request
// -----------------------------
export const deleteAccommodationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accom = await Accommodation.findById(id);
    if (!accom) return res.status(404).json({ error: "Request not found" });

    // Prevent deletion if already paid
    if (accom.paymentStatus === "SUCCESS")
      return res.status(400).json({ error: "Cannot delete a paid accommodation" });

    await accom.deleteOne();
    res.status(200).json({ message: "Accommodation request deleted" });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
