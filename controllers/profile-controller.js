import User from "../models/User.js";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import logger from "../utils/logger.js";

// ---------------- Get user details ----------------
export const getUserDetails = async (req, res, next) => {
  try {
    const T_ID = req.T_ID; // set by userExtractor middleware

    logger.info(`Fetching details for user T_ID: ${T_ID}`);

    const user = await User.findOne({ T_ID }).select("-password -__v"); // hide sensitive fields
    if (!user) {
      logger.warn(`User not found: T_ID ${T_ID}`);
      return res.status(404).json({ error: "User not found" });
    }

    logger.info(`User details retrieved successfully: T_ID ${T_ID}`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user details: ${error.stack}`);
    next(error); // pass error to centralized error handler
  }
};

// ---------------- Get user registrations ----------------
export const getUserRegistrations = async (req, res, next) => {
  try {
    const T_ID = req.T_ID; // set by userExtractor

    logger.info(`Fetching registrations for user T_ID: ${T_ID}`);

    const user = await User.findOne({ T_ID });
    if (!user) {
      logger.warn(`User not found for registrations: T_ID ${T_ID}`);
      return res.status(404).json({ error: "User not found" });
    }

    const registrations = await Registration.find({ user });

    const eventDetails = await Promise.all(
      registrations.map(async (registration) => {
        const event = await Event.findById(registration.event);
        if (!event) return null;

        return {
          title: event.title,
          category: event.type,
          day: event.day,
          time: event.time,
          venue: event.venue,
          isPaid: event.isPaid,
        };
      })
    );

    logger.info(`Registrations retrieved for user T_ID: ${T_ID}, total: ${eventDetails.filter(Boolean).length}`);
    return res.status(200).json(eventDetails.filter(Boolean));
  } catch (error) {
    logger.error(`Error fetching user registrations: ${error.stack}`);
    next(error); // pass error to centralized error handler
  }
};
