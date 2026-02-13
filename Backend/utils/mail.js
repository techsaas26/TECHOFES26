import nodemailer from "nodemailer";
import config from "./config.js";
import logger from "./logger.js";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false, // correct for 587
  auth: {
    user: config.SMTP_USER,      // MUST be "apikey"
    pass: config.SMTP_PASSWORD,  // 64-char SMTP key
  },
});

const sendMail = async (to, subject, text) => {
  if (!to || !subject || !text) {
    logger.warn("Missing email fields", { to, subject });
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"${config.FROM_NAME}" <${config.FROM_EMAIL}>`,
      to,
      subject,
      text,
    });

    logger.info("Email sent", {
      to,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (err) {
    logger.error("SMTP SEND FAILED", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      stack: err.stack,
    });
    throw err; // IMPORTANT: rethrow so routes know it failed
  }
};

export default sendMail;
