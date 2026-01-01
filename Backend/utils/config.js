import dotenv from "dotenv";
dotenv.config();

function requireEnv(varName) {
  const value = process.env[varName];
  if (!value) throw new Error(`${varName} is not defined`);
  return value;
}

const config = {
  // ---------------- Server & DB ----------------
  PORT: Number(process.env.PORT) || 4000,
  MONGODB_URI: requireEnv("MONGO_URI"),

  // ---------------- Cloudinary ----------------
  CLOUDINARY_CLOUD_NAME: requireEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),

  // ---------------- JWT ----------------
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",

  // ---------------- Email / SMTP ----------------
  SMTP_HOST: requireEnv("SMTP_HOST"),
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: requireEnv("SMTP_USER"),
  SMTP_PASSWORD: requireEnv("SMTP_PASSWORD"),
  FROM_EMAIL: requireEnv("FROM_EMAIL"),
  FROM_NAME: requireEnv("FROM_NAME"),

  // ---------------- Frontend ----------------
  FRONTEND_URL: requireEnv("FRONTEND_URL"),

  // ---------------- Razorpay ----------------
  RAZORPAY_KEY_ID: requireEnv("RAZORPAY_KEY_ID"),
  RAZORPAY_KEY_SECRET: requireEnv("RAZORPAY_KEY_SECRET"),
  RAZORPAY_WEBHOOK_SECRET: requireEnv("RAZORPAY_WEBHOOK_SECRET"),
};

export default config;
