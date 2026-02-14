import fetch from "node-fetch";
import config from "./config.js";
import logger from "./logger.js";

const sendMail = async (to, subject, text) => {
  if (!to || !subject || !text) {
    logger.warn("Missing email fields", { to, subject });
    return;
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": config.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: config.FROM_EMAIL, name: config.FROM_NAME },
        to: [{ email: to }],
        subject: subject,
        htmlContent: `<p>${text}</p>`,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(result));

    logger.info("Email sent successfully", { to, result });
  } catch (err) {
    logger.error("Brevo HTTP SEND FAILED", err);
    throw err;
  }
};

export default sendMail;
