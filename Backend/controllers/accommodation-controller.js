import Accommodation from "../models/Accommodation.js";
import User from "../models/User.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ Request accommodation (payment included)
// -----------------------------
export const requestAccommodation = async (req, res, next) => {
  try {
    const { userId, gender, no_of_nights } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ---------------- Check if already requested ----------------
    const existing = await Accommodation.findOne({ user: user._id });
    if (existing) {
      return res.status(400).json({ error: "Accommodation already requested" });
    }

    // Calculate payment
    const paymentAmount = no_of_nights * 300; // ₹300 per night

    // ---------------- Create Razorpay Order ----------------
    const order = await razorpay.orders.create({
      amount: paymentAmount * 100, // paise
      currency: "INR",
      receipt: `accom_${user._id}`,
      notes: {
        userId: user._id.toString(),
        gender,
        no_of_nights
      }
    });

    // Create Accommodation doc but mark as unpaid
    const accommodation = await Accommodation.create({
      user: user._id,
      gender,
      no_of_nights,
      payment_amount: paymentAmount,
      is_paid: false
    });

    logger.info(`Accommodation request created | User=${user.T_ID} | Order=${order.id}`);

    res.status(201).json({
      message: "Accommodation request created. Payment required",
      accommodation,
      razorpayOrder: order
    });

  } catch (err) {
    logger.error(`requestAccommodation error: ${err.stack}`);
    next(err);
  }
};

// -----------------------------
// 2️⃣ Get all accommodation requests
// -----------------------------
export const getAllAccommodations = async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find().populate("user", "T_ID rollNo firstName lastName");
    res.status(200).json(accommodations);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 3️⃣ Get accommodation request by roll number
// -----------------------------
export const getAccommodationByRoll = async (req, res, next) => {
  try {
    const { rollNo } = req.params;
    const user = await User.findOne({ rollNo });
    if (!user) return res.status(404).json({ error: "User not found" });

    const accommodations = await Accommodation.find({ user: user._id });
    res.status(200).json(accommodations);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 4️⃣ Get accommodation requests by gender
// -----------------------------
export const getAccommodationByGender = async (req, res, next) => {
  try {
    const { gender } = req.params;
    const accommodations = await Accommodation.find({ gender }).populate("user", "T_ID rollNo");
    res.status(200).json(accommodations);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// -----------------------------
// 5️⃣ Delete an accommodation request (optional)
// -----------------------------
export const deleteAccommodationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accom = await Accommodation.findById(id);
    if (!accom) return res.status(404).json({ error: "Request not found" });

    // Optional: prevent deletion if already paid
    if (accom.is_paid) {
      return res.status(400).json({ error: "Cannot delete a paid accommodation" });
    }

    await accom.deleteOne();
    res.status(200).json({ message: "Accommodation request deleted" });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
