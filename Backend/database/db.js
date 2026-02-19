import mongoose from "mongoose";
import logger from "../utils/logger.js";

mongoose.set("strictQuery", false);

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", {
      message: err.message,
    });
    throw err; // let caller decide what to do
  }
};
