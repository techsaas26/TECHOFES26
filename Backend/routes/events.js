import express from "express";
import {
  getAllEvents,
  registerEvent,
  getAllAgendas,
  getAllProshows,
  getParticularEvent,
} from "../controllers/event-controller.js";

import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

// ---------------- GET Routes ----------------
router.get("/agenda", getAllAgendas);
router.get("/proshows", getAllProshows);
router.get("/", getAllEvents);
router.get("/:id", getParticularEvent); // dynamic route comes last

// ---------------- POST Routes ----------------

export default router;
