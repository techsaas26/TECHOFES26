import express from "express";
import cors from "cors";
import config from "./utils/config.js";
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

// CORS
app.use(
  cors({
    origin: [config.FRONTEND_URL],
    credentials: true,
  })
);

// Razorpay webhook MUST use raw body
app.use("/api/razorpay/webhook", express.raw({ type: "*/*" }));

// General JSON parser (after webhook)
app.use(express.json());

// Request logging
app.use(middleware.requestLogger);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/accommodation", accommodationRouter);
app.use("/api/merchandise", merchandiseRouter);
app.use("/api/razorpay", razorpayRouter);

// Unknown endpoints
app.use(middleware.unknownEndpoint);

// Error handler (last)
app.use(middleware.errorHandler);

export default app;
