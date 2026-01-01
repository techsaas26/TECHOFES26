import express from "express";
import {
  requestAccommodation,
  getAllAccommodations,
  deleteAccommodationRequest,
} from "../controllers/accommodation-controller.js";

import { userExtractor, adminExtractor } from "../utils/middleware.js";

const router = express.Router();

/* ======================
   User Route (Login Required)
====================== */
router.post("/request", userExtractor, requestAccommodation); // login required

/* ======================
   Admin Routes Only
====================== */
router.get("/", userExtractor, adminExtractor, getAllAccommodations); // optional query filters
router.delete("/:id", userExtractor, adminExtractor, deleteAccommodationRequest);

export default router;
