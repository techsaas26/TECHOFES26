import app from "./app.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const PORT = config.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});