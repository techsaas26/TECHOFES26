import winston from "winston";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = winston.createLogger({
  level: "info", // default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console(),
    // File outputs (optional)
    new winston.transports.File({ filename: "../logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "../logs/combined.log" }),
  ],
});

// Stream interface for morgan (HTTP request logging)
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;
