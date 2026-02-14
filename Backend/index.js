import app from "./app.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import { connectDB } from "./database/db.js";

const PORT = config.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(config.MONGODB_URI);

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} `);
    });

    // Graceful shutdown handler
    const shutdown = async (signal) => {
      logger.warn(`${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        logger.info("HTTP server closed.");

        try {
          await mongoose.connection.close(false);
          logger.info("MongoDB connection closed.");
        } catch (err) {
          logger.error("Error closing MongoDB connection", {
            message: err.message,
          });
        }

        process.exit(0);
      });

      setTimeout(() => {
        logger.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    logger.error("Startup failed", {
      message: err.message,
    });
    process.exit(1);
  }
};

// Fatal error handlers (process-level)
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", {
    reason: reason instanceof Error ? reason.stack : reason,
  });
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

startServer();
