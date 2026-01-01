import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import razorpay from "../utils/pay.js";
import logger from "../utils/logger.js";

/* =========================
   GET Events (Public, filterable)
   Query params supported:
     - day (1, 2)
     - category (Club, Iconic, Signature, Night Events)
     - isPaid (true/false)
     - time (Day, Night)
========================= */
export const getEvents = async (req, res, next) => {
  try {
    const { day, category, isPaid, time } = req.query;

    let filter = {};
    if (day) filter.day = Number(day);
    if (category) filter.category = category;
    if (isPaid !== undefined) filter.isPaid = isPaid === "true";
    if (time) filter.time = time;

    const events = await Event.find(filter).sort({ day: 1, time: 1, title: 1 });
    logger.info(`Fetched ${events.length} events with filter: ${JSON.stringify(filter)}`);
    res.status(200).json(events);
  } catch (err) {
    logger.error("Error fetching events", err);
    next(err);
  }
};

/* =========================
   Register for Event (Login required)
========================= */
export const registerEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const user = req.user; // populated by userExtractor
    const T_ID = req.T_ID;

    if (!user) {
      logger.warn(`Unauthorized registration attempt | T_ID=${T_ID}`);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Check if already registered
    const existing = await Registration.findOne({ user: user._id, event: event._id });
    if (existing) return res.status(400).json({ error: "Already registered for this event" });

    // Free event
    if (!event.isPaid) {
      const registration = await Registration.create({ user: user._id, event: event._id });
      logger.info(`Free event registration created | T_ID=${T_ID} | Event=${eventId}`);
      return res.status(201).json({
        message: "Registered successfully (Free Event)",
        registration,
      });
    }

    // Paid event: calculate total charge including gateway + GST
    const baseFee = event.fee || 200; // default ₹200
    const gatewayPercent = 0.02;      // 2%
    const gstPercent = 0.18;          // 18%
    const totalCharge = Math.ceil(baseFee / (1 - gatewayPercent * (1 + gstPercent)));

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalCharge * 100, // in paise
      currency: "INR",
      receipt: `event_${event._id}_${user._id}`, // webhook uses this
      notes: {
        eventId: event._id.toString(),
        userId: user._id.toString(),
        baseFee: baseFee,
        convenienceFee: totalCharge - baseFee,
      },
    });

    logger.info(`Razorpay order created | T_ID=${T_ID} | Event=${eventId} | Order=${order.id}`);

    res.status(200).json({
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
