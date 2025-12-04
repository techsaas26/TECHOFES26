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

router.get("/agenda", getAllAgendas);
router.get("/proshows", getAllProshows);
router.get("/", getAllEvents);
router.post("/register", userExtractor, registerEvent);
router.get("/:id", getParticularEvent);

export default router;
