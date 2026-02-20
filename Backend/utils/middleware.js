import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import multer from "multer";
import config from "./config.js";

// ---------------- Request Logger ----------------
export const requestLogger = (req, res, next) => {
  const safeBody = { ...req.body };
<<<<<<< HEAD
  if (safeBody.password) safeBody.password = "***"; // mask sensitive info
=======
  if (safeBody.password) safeBody.password = "***"; 
>>>>>>> upstream/main
  logger.info(
    `Method: ${req.method} | Path: ${req.path} | Body: ${JSON.stringify(
      safeBody
    ).slice(0, 500)}`
  );
  next();
};

// ---------------- JWT Token Helpers ----------------
const getTokenFrom = (req) => {
  const auth = req.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.replace("Bearer ", "");
};

export const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);
  if (!token) return res.status(401).json({ error: "token missing" });

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken.T_ID)
      return res.status(401).json({ error: "token invalid" });

    req.T_ID = decodedToken.T_ID;
<<<<<<< HEAD
    req.user = await User.findOne({ T_ID: decodedToken.T_ID }).select(
      "-passwordHash"
    );
=======
    req.user = await User.findOne({ T_ID: decodedToken.T_ID });
>>>>>>> upstream/main
    next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }
};

// ---------------- Admin Role Middleware ----------------
export const adminExtractor = async (req, res, next) => {
  // Ensure userExtractor ran first
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Check admin role
  if (req.user.userType !== "admin" || req.user.T_ID !== "001ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};

// ---------------- File Upload Middleware ----------------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    )
      cb(null, true);
    else cb(new Error("Unsupported file type"), false);
  },
}).single("file");

export const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error("Multer error while uploading", err);
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    } else if (err) {
      logger.error("Unknown error during upload", err);
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
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
  logger.error(error.stack || error.message, {
    method: req.method,
    path: req.path,
  });

  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      error: `The ${field} "${error.keyValue[field]}" is already in use.`,
    });
  }

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: `Invalid ${error.path} format` });
  }

  if (error.name === "JsonWebTokenError")
    return res.status(401).json({ error: "Invalid token" });
  if (error.name === "TokenExpiredError")
    return res.status(401).json({ error: "Token expired" });
  if (error.name === "RazorpayError")
    return res
      .status(400)
      .json({ error: error.description || "Payment processing error" });
  if (error.name === "MulterError")
    return res.status(400).json({ error: error.message });
  if (error.isCustom)
    return res.status(error.status || 400).json({ error: error.message });

  res.status(500).json({ error: "Internal server error" });
};

export default {
  requestLogger,
  userExtractor,
  adminExtractor,
  errorHandler,
  unknownEndpoint,
  uploadMiddleware,
};
