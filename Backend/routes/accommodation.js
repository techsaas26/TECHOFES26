import express from "express";
import {
  requestAccommodation,
  getAllAccommodations,
  getAccommodationByRoll,
  getAccommodationByGender,
  deleteAccommodationRequest
} from "../controllers/accommodationController.js";

const router = express.Router();

// 1️⃣ Request accommodation (payment included)
router.post("/request", requestAccommodation);

// 2️⃣ Get all accommodation requests
router.get("/", getAllAccommodations);

// 3️⃣ Get accommodation request by roll number
router.get("/roll/:rollNo", getAccommodationByRoll);

// 4️⃣ Get accommodation requests by gender
router.get("/gender/:gender", getAccommodationByGender);

// 5️⃣ Delete a request (optional)
router.delete("/:id", deleteAccommodationRequest);

export default router;
