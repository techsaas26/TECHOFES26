import express from "express";
import {
  getAllUsers,
  getAllRegistrations,
  getTotalUsers,
  getTotalRegistrations,
  uploadAgenda,
  uploadEvent,
  uploadProshow,
} from "../controllers/admin-controller.js";

import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

// Apply authentication + admin check
router.use(userExtractor);
router.use((req, res, next) => {
  if (req.user.username !== "admin") {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
});

// ---------------- GET Routes ----------------
router.get("/users", getAllUsers);
router.get("/registrations", getAllRegistrations);
router.get("/totalusers", getTotalUsers);
router.get("/totalregistrations", getTotalRegistrations);


// ---------------- POST Routes (Uploads) ----------------
router.post("/upload/agenda", uploadAgenda);
router.post("/upload/event", uploadEvent);
router.post("/upload/proshow", uploadProshow);

export default router;
