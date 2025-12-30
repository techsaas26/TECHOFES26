import User from "../models/User.js";
import Registration from "../models/Registration.js";
import logger from "../utils/logger.js";

/* =========================
   Get User Details
========================= */
export const getUserDetails = async (req, res, next) => {
  try {
    const { T_ID } = req; // set by userExtractor middleware

    logger.info(`Fetching details for user T_ID: ${T_ID}`);

    const user = await User.findOne({ T_ID });
    if (!user) {
      logger.warn(`User not found: T_ID ${T_ID}`);
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user details: ${error.stack}`);
    next(error);
  }
};

/* =========================
   Get User Registrations
========================= */
export const getUserRegistrations = async (req, res, next) => {
  try {
    const { T_ID } = req;

    logger.info(`Fetching registrations for user T_ID: ${T_ID}`);

    const user = await User.findOne({ T_ID }).select("_id");
    if (!user) {
      logger.warn(`User not found: T_ID ${T_ID}`);
      return res.status(404).json({ error: "User not found" });
    }

    const registrations = await Registration.find({ user: user._id })
      .populate({
        path: "event",
        select: "title category day time venue isPaid",
      })
      .select("event paymentStatus ");

    const response = registrations
      .filter((r) => r.event) // safety
      .map((r) => ({
        title: r.event.title,
        category: r.event.category,
        day: r.event.day,
        time: r.event.time,
        venue: r.event.venue,
        isPaid: r.event.isPaid,
        paymentStatus: r.paymentStatus,
      }));

    logger.info(
      `Registrations retrieved for T_ID ${T_ID}, count: ${response.length}`
    );

    return res.status(200).json(response);
  } catch (error) {
    logger.error(`Error fetching user registrations: ${error.stack}`);
    next(error);
  }
};
