import express from "express";
import cors from "cors";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import sendMail from "./utils/mail.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import adminRouter from "./routes/admin.js";

import "express-async-errors";

// Create Express app
const app = express();

// CORS
const allowedOrigins = [config.FRONTEND_URL1, config.FRONTEND_URL2];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// General JSON parser (after webhook)
app.use(express.json());

// Request logging
app.use(middleware.requestLogger);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", usersRouter);
app.use("/api/admin", adminRouter);

// Unknown endpoints
app.use(middleware.unknownEndpoint);

// Error handler (last)
app.use(middleware.errorHandler);

export default app;
