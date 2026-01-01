import express from "express";
import { userExtractor } from "../utils/middleware.js";
import {
  getEvents,
  registerEvent,
} from "../controllers/event-controller.js";

const router = express.Router();

/* ======================
   GET Events (Public)
   Optional query parameters:
     - day (1 or 2)
     - category (Club, Iconic, Signature, Night Events)
     - paid (true/false)
====================== */
router.get("/", getEvents);

/* ======================
   POST Event Registration (Login Required)
====================== */
router.post("/register", userExtractor, registerEvent);

export default router;
