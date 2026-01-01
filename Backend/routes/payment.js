import express from "express";
import { verifyPayment } from "../controllers/payment-controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

// Protect endpoint with JWT middleware
router.post("/verify", userExtractor, verifyPayment);

export default router;
