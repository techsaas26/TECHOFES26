import express from "express";
import {
  purchaseMerchandise,
  getAllMerchPurchases,
  getPurchaseByRoll,
  getPurchaseBySize,
  getPurchasesByCombo
} from "../controllers/merch-controller.js";

const router = express.Router();

// 1️⃣ Purchase merchandise (payment included)
router.post("/purchase", purchaseMerchandise);

// 2️⃣ Get all merchandise purchases
router.get("/", getAllMerchPurchases);

// 3️⃣ Get purchase by roll number
router.get("/roll/:rollNo", getPurchaseByRoll);

// 4️⃣ Get purchase by size
router.get("/size/:size", getPurchaseBySize);

// 5️⃣ Get all purchases under particular combo
router.get("/combo/:comboType", getPurchasesByCombo);

export default router;
