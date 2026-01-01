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

// -----------------------------
// 2️⃣ Registration Management
// -----------------------------
export const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "T_ID username firstName lastName")
      .populate("event", "title category day time isPaid fee");
    res.status(200).json(registrations);
  } catch (err) {
    logger.error(`getAllRegistrations error: ${err.stack}`);
    next(err);
  }
};

export const getTotalRegistrations = async (req, res, next) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    res.status(200).json({ totalRegistrations });
  } catch (err) {
    logger.error(`getTotalRegistrations error: ${err.stack}`);
    next(err);
  }
};

//accommodation, merchandise registration GET APIs are added in respective routers and controllers