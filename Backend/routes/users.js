import express from "express";
import {
  getUserDetails,
  getUserRegistrations,
  getUserAccommodationsDetails,
  getUserMerchDetails
} from "../controllers/profile-controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

router.get("/", userExtractor, getUserDetails);
router.get("/registrations", userExtractor, getUserRegistrations);
router.get("/accommodations", userExtractor, getUserAccommodationsDetails);
router.get("/merchs", userExtractor, getUserMerchDetails);

export default router;
