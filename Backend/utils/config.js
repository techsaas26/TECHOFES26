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

  // ---------------- JWT ----------------
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",

  // ---------------- Email / SMTP ----------------
  SMTP_HOST: requireEnv("SMTP_HOST"),
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: requireEnv("SMTP_USER"),
  BREVO_API_KEY: requireEnv("SMTP_PASSWORD"),
  FROM_EMAIL: requireEnv("FROM_EMAIL"),
  FROM_NAME: requireEnv("FROM_NAME"),

  // ---------------- Frontend ----------------
  FRONTEND_URL1: requireEnv("FRONTEND_URL1"),
  FRONTEND_URL2: requireEnv("FRONTEND_URL2"),
};

export default config;
