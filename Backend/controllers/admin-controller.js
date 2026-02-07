import User from "../models/User.js";
import Registration from "../models/Registration.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ User Management
// -----------------------------
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-passwordHash"); // exclude sensitive info
    res.status(200).json(users);
  } catch (err) {
    logger.error(`getAllUsers error: ${err.stack}`);
    next(err);
  }
};

export const getTotalUsers = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (err) {
    logger.error(`getTotalUsers error: ${err.stack}`);
    next(err);
  }
};
