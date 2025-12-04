import mongoose from "mongoose";
import config from "../utils/config.js";
import logger from "../utils/logger.js";

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

export const conn = async(url) => {
  try {
    await mongoose.connect(url);
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.error("error connecting to MongoDB:", e.message);
    process.exit(1);
  }
}

