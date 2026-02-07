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
    if (!req.user)
      throw { isCustom: true, message: "User not found", status: 404 };

    const {
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      rollNo,
      college,
    } = req.user;

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
