import Event from "../models/event.js";
import Agenda from "../models/agenda.js";
import ProShow from "../models/ProShow.js";
import Registration from "../models/Registration.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

// ---------------- GET all events ----------------
export const getAllEvents = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.day) filter.day = Number(req.query.day);
    if (req.query.time) filter.time = req.query.time;
    if (req.query.isPaid) filter.isPaid = req.query.isPaid === "true";

    const events = await Event.find(filter).sort({ day: 1, time: 1 });
    logger.info(`Fetched ${events.length} events`);
    res.status(200).json(events);
  } catch (err) {
    logger.error("Error fetching events", err);
    next(err);
  }
};

// ---------------- GET all agendas ----------------
export const getAllAgendas = async (req, res, next) => {
  try {
    const agendas = await Agenda.find().sort({ day: 1 });
    logger.info(`Fetched ${agendas.length} agendas`);
    res.status(200).json(agendas);
  } catch (err) {
    logger.error("Error fetching agendas", err);
    next(err);
  }
};

// ---------------- GET all proshows ----------------
export const getAllProshows = async (req, res, next) => {
  try {
    const proShows = await ProShow.find().sort({ date: 1 });
    logger.info(`Fetched ${proShows.length} proshows`);
    res.status(200).json(proShows);
  } catch (err) {
    logger.error("Error fetching proshows", err);
    next(err);
  }
};

// ---------------- GET particular event ----------------
export const getParticularEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      logger.error(`Event not found: ID ${req.params.id}`);
      return res.status(404).json({ error: "Event not found" });
    }
    logger.info(`Fetched event: ${event.title} (ID: ${event._id})`);
    res.status(200).json(event);
  } catch (err) {
    logger.error("Error fetching particular event", err);
    next(err);
  }
};

// ---------------- Register for an event ----------------
export const registerEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const user = req.user; // populated by userExtractor middleware
    const T_ID = req.T_ID;

    if (!user) {
      logger.warn(`Unauthorized registration attempt | T_ID=${T_ID}`);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      logger.error(`Event not found | ID=${eventId}`);
      return res.status(404).json({ error: "Event not found" });
    }

    // ---------------- Check if already registered ----------------
    const existing = await Registration.findOne({ user: user._id, event: event._id });
    if (existing) {
      logger.warn(`Already registered | T_ID=${T_ID} | Event=${eventId}`);
      return res.status(400).json({ error: "Already registered for this event" });
    }

    // ---------------- Free Event ----------------
    if (!event.isPaid) {
      const registration = await Registration.create({ user: user._id, event: event._id });
      logger.info(`Free event registration created | T_ID=${T_ID} | Event=${eventId}`);
      return res.status(201).json({
        message: "Registered successfully (Free Event)",
        registration,
      });
    }

    // ---------------- Paid Event ----------------
    const baseFee = event.fee || 200;  // default ₹200
    const gatewayPercent = 0.02;       // 2%
    const gstPercent = 0.18;           // 18%
    const totalCharge = Math.ceil(baseFee / (1 - gatewayPercent * (1 + gstPercent)));

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalCharge * 100,       // in paise
      currency: "INR",
      receipt: `event_${event._id}_${user._id}`,  // matches webhook
      notes: {
        eventId: event._id.toString(),
        userId: user._id.toString(),
        baseFee: baseFee,
        convenienceFee: totalCharge - baseFee
      }
    });

    logger.info(`Razorpay order created | T_ID=${T_ID} | Event=${eventId} | Order=${order.id}`);

    return res.status(200).json({
      message: "Payment required",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      totalCharge,
      baseFee,
      convenienceFee: totalCharge - baseFee,
      eventId: event._id,
    });

  } catch (err) {
    logger.error(`registerEvent error | T_ID=${req.T_ID} | ${err.stack}`);
    next(err);
  }
};
