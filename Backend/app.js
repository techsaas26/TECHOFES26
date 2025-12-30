import express from "express";
import cors from "cors";
import config from "./utils/config.js";
import { conn } from "./database/db.js";
import middleware from "./utils/middleware.js";

import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import adminRouter from "./routes/admin.js";
import paymentRouter from "./routes/payment.js";
import razorpayRouter from "./routes/razorpay.js";
import accommodationRouter from "./routes/accommodation.js";
import merchandiseRouter from "./routes/merchandise.js";

import "express-async-errors";

// Create Express app
const app = express();

// Connect to MongoDB
conn(config.MONGODB_URI).catch((err) => {
  console.error("MongoDB connection failed:", err);
  process.exit(1); // Stop app if DB connection fails
});

// Middleware
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.use("/api/auth", authRouter); // Register, login, logout
app.use("/api/profile", usersRouter); // User details & registrations
app.use("/api/events", eventsRouter); // Event-related routes
app.use("/api/admin", adminRouter); // Admin routes (ensure auth middleware inside adminRouter)
app.use("/api/payment", paymentRouter); // Payment-related routes
app.use("/api/accommodation", accommodationRouter); // Accommodation-related routes
app.use("/api/merchandise", merchandiseRouter); // Merchandise-related routes
app.use("/api/razorpay", razorpayRouter); // Razorpay webhook route

// Handle unknown endpoints
app.use(middleware.unknownEndpoint);

// Error handling middleware (must be last)
app.use(middleware.errorHandler);

// Handle uncaught exceptions & unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

export default app;
