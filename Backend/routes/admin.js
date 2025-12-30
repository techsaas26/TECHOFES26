import express from "express";
import {
  getAllUsers,
  getAllRegistrations,
  getTotalUsers,
  getTotalRegistrations,
  uploadAgenda,
  uploadEvent,
  uploadProshow,
  getAllMerchandise,
  getMerchByRoll,
  getMerchBySize,
  getMerchByCombo,
  getAllAccommodations,
  getAccommodationByRoll,
  getAccommodationByGender,
  deleteAccommodationRequest,
} from "../controllers/admin-controller.js";

import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

// --------------------
// Admin Auth Middleware
// --------------------
router.use(userExtractor);
router.use((req, res, next) => {
  if (req.user.username !== "admin") {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
});

// ---------------- GET Routes ----------------
// Users
router.get("/users", getAllUsers);
router.get("/totalusers", getTotalUsers);

// Registrations
router.get("/registrations", getAllRegistrations);
router.get("/totalregistrations", getTotalRegistrations);

// Merchandise
router.get("/merchandise", getAllMerchandise);
router.get("/merchandise/roll/:rollNo", getMerchByRoll);
router.get("/merchandise/size/:size", getMerchBySize);
router.get("/merchandise/combo/:combo_type", getMerchByCombo);

// Accommodation
router.get("/accommodations", getAllAccommodations);
router.get("/accommodations/roll/:rollNo", getAccommodationByRoll);
router.get("/accommodations/gender/:gender", getAccommodationByGender);

// ---------------- POST Routes (Uploads) ----------------
// Event-related uploads
router.post("/upload/agenda", uploadAgenda);
router.post("/upload/event", uploadEvent);
router.post("/upload/proshow", uploadProshow);

// ---------------- DELETE Routes ----------------
// Delete accommodation request
router.delete("/accommodations/:id", deleteAccommodationRequest);

export default router;
