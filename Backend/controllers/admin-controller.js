import User from "../models/User.js";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import Agenda from "../models/Agenda.js";
import ProShow from "../models/ProShow.js";
import Merchandise from "../models/Merchandise.js";
import Accommodation from "../models/Accommodation.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// -----------------------------
// 1️⃣ User Management
// -----------------------------
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) { next(err); }
};

export const getTotalUsers = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (err) { next(err); }
};

// -----------------------------
// 2️⃣ Registration Management
// -----------------------------
export const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find().populate("user event");
    res.status(200).json(registrations);
  } catch (err) { next(err); }
};

export const getTotalRegistrations = async (req, res, next) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    res.status(200).json({ totalRegistrations });
  } catch (err) { next(err); }
};

// -----------------------------
// 3️⃣ Event / Agenda / Proshow Uploads
// -----------------------------
export const uploadAgenda = async (req, res, next) => {
  try {
    const { day, imgUrl } = req.body;
    if (!imgUrl || ![1,2].includes(day)) return res.status(400).json({ error: "Invalid day or missing image" });

    await Agenda.findOneAndDelete({ day });
    const agenda = await Agenda.create({ day, imgUrl });
    res.status(201).json({ success: true, agenda });
  } catch (err) { next(err); }
};

export const uploadProshow = async (req, res, next) => {
  try {
    const { name, imgUrl, date } = req.body;
    if (!name || !imgUrl) return res.status(400).json({ error: "Name and image required" });

    const proShow = await ProShow.create({ name, imgUrl, date });
    res.status(201).json({ success: true, proShow });
  } catch (err) { next(err); }
};

export const uploadEvent = async (req, res, next) => {
  try {
    const { title, imgUrl, club, description, venue, type, day, time, isPaid, fee } = req.body;
    if (!title || !imgUrl || !club || !day) return res.status(400).json({ error: "Missing required fields" });

    const allowedDays = [1,2];
    const allowedTimes = ["Day","Night"];
    const allowedTypes = ["Club","Iconic","Signature","Night Events"];

    if (!allowedDays.includes(day) || (time && !allowedTimes.includes(time)) || (type && !allowedTypes.includes(type))) {
      return res.status(400).json({ error: "Invalid day/time/type" });
    }

    const event = await Event.create({ title, imgUrl, club, description, venue, type, day, time, isPaid, fee });
    res.status(201).json({ success: true, event });
  } catch (err) { next(err); }
};

// -----------------------------
// 4️⃣ Merchandise Management
// -----------------------------
export const getAllMerchandise = async (req, res, next) => {
  try {
    const merch = await Merchandise.find().populate("user", "T_ID rollNo");
    res.status(200).json(merch);
  } catch (err) { next(err); }
};

export const getMerchByRoll = async (req, res, next) => {
  try {
    const { rollNo } = req.params;
    const user = await User.findOne({ rollNo });
    if (!user) return res.status(404).json({ error: "User not found" });

    const merch = await Merchandise.find({ user: user._id });
    res.status(200).json(merch);
  } catch (err) { next(err); }
};

export const getMerchBySize = async (req, res, next) => {
  try {
    const { size } = req.params;
    const merch = await Merchandise.find({ "sizes.size": size }).populate("user", "T_ID rollNo");
    res.status(200).json(merch);
  } catch (err) { next(err); }
};

export const getMerchByCombo = async (req, res, next) => {
  try {
    const { combo_type } = req.params;
    const merch = await Merchandise.find({ combo_type }).populate("user", "T_ID rollNo");
    res.status(200).json(merch);
  } catch (err) { next(err); }
};

// -----------------------------
// 5️⃣ Accommodation Management
// -----------------------------
export const getAllAccommodations = async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find().populate("user", "T_ID rollNo firstName");
    res.status(200).json(accommodations);
  } catch (err) { next(err); }
};

export const getAccommodationByRoll = async (req, res, next) => {
  try {
    const { rollNo } = req.params;
    const user = await User.findOne({ rollNo });
    if (!user) return res.status(404).json({ error: "User not found" });

    const accom = await Accommodation.find({ user: user._id });
    res.status(200).json(accom);
  } catch (err) { next(err); }
};

export const getAccommodationByGender = async (req, res, next) => {
  try {
    const { gender } = req.params;
    const accom = await Accommodation.find({ gender }).populate("user", "T_ID rollNo firstName");
    res.status(200).json(accom);
  } catch (err) { next(err); }
};

export const deleteAccommodationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accom = await Accommodation.findById(id);
    if (!accom) return res.status(404).json({ error: "Request not found" });
    if (accom.is_paid) return res.status(400).json({ error: "Cannot delete a paid accommodation" });

    await accom.deleteOne();
    res.status(200).json({ message: "Accommodation request deleted" });
  } catch (err) { next(err); }
};
