import nodemailer from "nodemailer";
import config from "./config.js";
import logger from "./logger.js";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Can be replaced with SendGrid, SES, etc.
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});

const sendMail = async (to, subject, text) => {
  if (!to || !subject || !text) {
    logger.warn("Missing email fields", { to, subject });
    return;
  }

  const mailOptions = {
    from: config.SMTP_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (err) {
    logger.error("Error sending email", { to, subject, message: err.message });
  }
};

export default sendMail;
