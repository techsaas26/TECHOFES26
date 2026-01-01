import User from "../models/User.js";
import Registration from "../models/Registration.js";
import Accommodation from "../models/Accommodation.js";
import MerchOrder from "../models/MerchOrder.js";
import Event from "../models/Event.js";

/* ======================
   Get user profile
====================== */
export const getUserDetails = async (req, res, next) => {
  try {
    if (!req.user) throw { isCustom: true, message: "User not found", status: 404 };

    const { T_ID, username, firstName, lastName, email, phoneNumber, userType, rollNo, college } =
      req.user;

    res.json({
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      rollNo,
      college,
    });
  } catch (err) {
    next(err);
  }
};

/* ======================
   Get user registrations
====================== */
export const getUserRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate("event", "title club day time category isPaid fee")
      .lean();

    res.json(registrations);
  } catch (err) {
    next(err);
  }
};

/* ======================
   Get user accommodation
====================== */
export const getUserAccommodationsDetails = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findOne({ user: req.user._id }).lean();

    if (!accommodation) {
      return res.status(404).json({ error: "No accommodation booked" });
    }

    res.json(accommodation);
  } catch (err) {
    next(err);
  }
};

/* ======================
   Get user merchandise purchases
====================== */
export const getUserMerchDetails = async (req, res, next) => {
  try {
    const merchOrders = await MerchOrder.find({ user: req.user._id }).lean();

    res.json(merchOrders);
  } catch (err) {
    next(err);
  }
};
