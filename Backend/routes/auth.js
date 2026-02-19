import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth-controller.js";

const router = express.Router();

// ---------------- Auth Routes ----------------
router.post("/register", registerUser); // User registration
router.post("/login", loginUser);       // User login
router.post("/logout", logoutUser);     // User logout

export default router;
