import nodemailer from "nodemailer";
import config from "./config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service (e.g., Gmail, Outlook)
  auth: {
    user: config.SMTP_USER, // Your email address
    pass: config.SMTP_PASSWORD, // Your email password or app-specific password
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;