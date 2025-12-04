import User from "../models/User.js";
import Registration from "../models/Registration.js";
import Agenda from "../models/Agenda.js";
import ProShow from "../models/ProShow.js";
import Event from "../models/Event.js";
import logger from "../utils/logger.js";

// ---------------- GET Controllers ----------------
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    logger.info(`Fetched all users. Count: ${users.length}`);
    res.status(200).json(users);
  } catch (err) {
    logger.error("Error fetching users", err);
    next(err);
  }
};

export const getTotalUsers = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    logger.info(`Total user registrations: ${totalUsers}`);
    res.status(200).json({ totalUserRegistrations: totalUsers });
  } catch (err) {
    logger.error("Error counting users", err);
    next(err);
  }
};

export const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({}).populate("user event");
    logger.info(`Fetched all registrations. Count: ${registrations.length}`);
    res.status(200).json(registrations);
  } catch (err) {
    logger.error("Error fetching registrations", err);
    next(err);
  }
};

export const getTotalRegistrations = async (req, res, next) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    logger.info(`Total registrations: ${totalRegistrations}`);
    res.status(200).json({ totalRegistrations });
  } catch (err) {
    logger.error("Error counting registrations", err);
    next(err);
  }
};

// ---------------- POST Controllers (Uploads) ----------------
export const uploadAgenda = async (req, res, next) => {
  try {
    const { day, imgUrl } = req.body;

    if (!imgUrl) {
      logger.error("Agenda upload failed: Image URL missing");
      return res.status(400).json({ error: "Image URL is required" });
    }

    const allowedDays = [1, 2];
    if (!allowedDays.includes(day)) {
      logger.error(`Agenda upload failed: Invalid day ${day}`);
      return res.status(400).json({ error: `Invalid day. Allowed values: ${allowedDays.join(", ")}` });
    }

    await Agenda.findOneAndDelete({ day }); // remove existing agenda for the day
    const agenda = await Agenda.create({ day, imgUrl });

    logger.info(`Uploaded agenda for day ${day}`);
    res.status(201).json({ success: true, agenda });
  } catch (err) {
    logger.error("Error uploading agenda", err);
    next(err);
  }
};

export const uploadProshow = async (req, res, next) => {
  try {
    const { name, imgUrl, date } = req.body;

    if (!name || !imgUrl) {
      logger.error("Proshow upload failed: Name or Image missing");
      return res.status(400).json({ error: "Name and Image URL are required" });
    }

    const proShow = await ProShow.create({ name, imgUrl, date });
    logger.info(`Uploaded proshow: ${name}`);
    res.status(201).json({ success: true, proShow });
  } catch (err) {
    logger.error("Error uploading proshow", err);
    next(err);
  }
};

export const uploadEvent = async (req, res, next) => {
  try {
    const { title, imgUrl, club, description, venue, type, day, time, isPaid } = req.body;

    if (!title || !imgUrl || !club || !day) {
      logger.error("Event upload failed: Missing required fields");
      return res.status(400).json({ error: "Title, Image, Club, and Day are required" });
    }

    const allowedDays = [1, 2];
    const allowedTimes = ["Day", "Night"];
    const allowedTypes = ["Club", "Iconic", "Signature"];

    if (!allowedDays.includes(day)) {
      logger.error(`Event upload failed: Invalid day ${day}`);
      return res.status(400).json({ error: `Invalid day. Allowed values: ${allowedDays.join(", ")}` });
    }

    if (time && !allowedTimes.includes(time)) {
      logger.error(`Event upload failed: Invalid time ${time}`);
      return res.status(400).json({ error: `Invalid time. Allowed values: ${allowedTimes.join(", ")}` });
    }

    if (type && !allowedTypes.includes(type)) {
      logger.error(`Event upload failed: Invalid type ${type}`);
      return res.status(400).json({ error: `Invalid type. Allowed values: ${allowedTypes.join(", ")}` });
    }

    const event = await Event.create({ title, imgUrl, club, description, venue, type, day, time, isPaid });
    logger.info(`Uploaded event: ${title} for day ${day}`);
    res.status(201).json({ success: true, event });
  } catch (err) {
    logger.error("Error uploading event", err);
    next(err);
  }
};
