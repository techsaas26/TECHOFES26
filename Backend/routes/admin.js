import express from "express";
import { getAllUsers, getTotalUsers } from "../controllers/admin-controller.js";

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

export default router;
