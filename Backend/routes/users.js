import express from "express";
import { getUserDetails } from "../controllers/profile-controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

router.get("/", userExtractor, getUserDetails);

export default router;
