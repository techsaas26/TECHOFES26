import express from "express";
import { razorpayWebhook } from "../controllers/razorpay-controller.js";

const router = express.Router();

// -------------------------
// Razorpay Webhook Endpoint
// -------------------------
// MUST use express.raw() in app.js (or main server file)
// Do NOT use express.json() for this endpoint
router.post("/webhook", razorpayWebhook);

export default router;
