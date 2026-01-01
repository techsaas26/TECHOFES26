import express from "express";
import { razorpayWebhook } from "../controllers/razorpay-controller.js";

const router = express.Router();

// Razorpay Webhook Endpoint
// Must be mounted with express.raw() in main server file
router.post("/webhook", razorpayWebhook);

export default router;
