import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from "multer";
import config from "./config.js";

// ---------------- Request Logger ----------------
export const requestLogger = (req, res, next) => {
  const safeBody = { ...req.body };
  if (safeBody.password) safeBody.password = "***"; // mask sensitive info
  logger.info(`Method: ${req.method} | Path: ${req.path} | Body: ${JSON.stringify(safeBody)}`);
  next();
};

// ---------------- JWT Token Helpers ----------------
const getTokenFrom = (req) => {
  logger.info("Extracting token from Authorization header");
  const auth = req.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    logger.info("No Authorization header found");
    return null;
  }
  return auth.replace("Bearer ", "");
};

export const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);

  if (!token) return res.status(401).json({ error: "token missing" });

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken.T_ID) return res.status(401).json({ error: "token invalid" });

    req.T_ID = decodedToken.T_ID;
    logger.info(`Authenticated user T_ID: ${req.T_ID}`);
    req.user = await User.findOne({ T_ID: decodedToken.T_ID }).select("-passwordHash"); // exclude password
    next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }
};

// ---------------- File Upload Middleware ----------------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single("file");

export const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error("Multer error while uploading", err);
      return res.status(400).json({ message: "File upload error", error: err.message });
    } else if (err) {
      logger.error("Unknown error during upload", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    next();
  });
};

// ---------------- Unknown Endpoint ----------------
export const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

// ---------------- Error Handler ----------------
export const errorHandler = (error, req, res, next) => {
  logger.error(error.stack || error.message);

  // ---------------- Mongoose Duplicate Key ----------------
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      error: `The ${field} "${error.keyValue[field]}" is already in use.`,
    });
  }

  // ---------------- Mongoose Validation Error ----------------
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  // ---------------- Mongoose CastError ----------------
  if (error.name === "CastError") {
    return res.status(400).json({ error: `Invalid ${error.path} format` });
  }

  // ---------------- JWT Errors ----------------
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  // ---------------- Payment / Razorpay Errors ----------------
  if (error.name === "RazorpayError") {
    return res.status(400).json({ error: error.description || "Payment processing error" });
  }

  // ---------------- Multer File Upload Errors ----------------
  if (error.name === "MulterError") {
    return res.status(400).json({ error: error.message });
  }

  // ---------------- Custom Errors (if you throw manually) ----------------
  if (error.isCustom) {
    return res.status(error.status || 400).json({ error: error.message });
  }

  // ---------------- Fallback ----------------
  res.status(500).json({ error: "Internal server error" });
};

export default {
  requestLogger,
  userExtractor,
  errorHandler,
  unknownEndpoint,
  uploadMiddleware,
};