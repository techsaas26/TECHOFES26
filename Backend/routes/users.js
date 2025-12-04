import express from "express";
import { getUserDetails, getUserRegistrations } from "../controllers/profile-controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

// Protect routes with userExtractor (checks token, sets req.T_ID)
router.get("/", userExtractor, getUserDetails);
router.get("/registrations", userExtractor, getUserRegistrations);

//add merch, accommodation routes to fetch details for the user profile in future

export default router;
