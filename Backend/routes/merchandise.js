import express from "express";
import { userExtractor, adminExtractor } from "../utils/middleware.js";
import {
  purchaseMerchandise,
  getAllMerchPurchases,
} from "../controllers/merch-controller.js";

const router = express.Router();

/* ======================
   User Route (Login Required)
====================== */
router.post("/purchase", userExtractor, purchaseMerchandise);

/* ======================
   Admin Route Only
   - Supports optional query parameters:
     rollNo, size, comboType, T_ID, name
====================== */
router.get("/", userExtractor, adminExtractor, getAllMerchPurchases);

export default router;
