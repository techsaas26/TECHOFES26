import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mail.js";
import logger from "../utils/logger.js";
import config from "../utils/config.js";
import UserIdTracker from "../models/userIdTracker.js";

const MAX_ATTEMPTS = 3;

/**
 * Safe Non-Blocking Email Sender
 * Does NOT throw errors
 */
const sendEmailSafely = (to, subject, text) => {
  sendMail(to, subject, text)
    .then(() => {
      logger.info(`Email successfully sent to ${to}`);
    })
    .catch((err) => {
      logger.info(
        `Email sending failed for ${to}. Reason: ${err.message}`
      );
    });
};

// ---------------- Register ----------------
export const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      fullName,
      email,
      phoneNumber,
      collegeName,
      department,
      rollNo,
      password,
      userType,
    } = req.body;

    if (!username || !email || !password || !userType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!["CEG", "OUTSIDE"].includes(userType)) {
      return res
        .status(400)
        .json({ error: "Invalid userType. Must be CEG or OUTSIDE" });
    }

    logger.info(
      `Register attempt | username: ${username} | email: ${email} | type: ${userType}`
    );

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ username }, { email: normalizedEmail }],
    });

    if (existingUser) {
      logger.info(
        `Registration failed: username/email already in use (${username} / ${normalizedEmail})`
      );
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const T_ID =
      userType === "CEG"
        ? await UserIdTracker.getNextInsiderId()
        : await UserIdTracker.getNextOutsiderId();

    const user = new User({
      T_ID,
      username,
      fullName,
      email: normalizedEmail,
      phoneNumber,
      passwordHash,
      userType,
      rollNo,
      college: userType === "CEG"
        ? "College of Engineering Guindy"
        : collegeName,
      department,
    });

    const savedUser = await user.save();

    logger.info(
      `User registered successfully: ${savedUser.username} (T_ID: ${savedUser.T_ID})`
    );

    // 🔥 Non-Blocking Email (Production Style)
    const subject = "Registration Confirmation";
    const text = `Dear ${savedUser.fullName},

Thank you for registering!
Your unique T_ID is: ${savedUser.T_ID}
Username: ${savedUser.username}

Best regards,
Tech Team`;

    sendEmailSafely(savedUser.email, subject, text);

    const userResponse = savedUser.toObject();
    delete userResponse.passwordHash;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });

  } catch (err) {
    logger.info(`Error during registration: ${err.message}`);
    next(err);
  }
};

// ---------------- Login ----------------
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    logger.info(`Login attempt for username: ${username}`);

    const user = await User.findOne({ username }).select("+passwordHash");

    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      user.failedAttempts += 1;

      if (user.failedAttempts >= MAX_ATTEMPTS && user.username !== "admin") {
        logger.info(
          `User ${username} exceeded max login attempts. Sending alert email.`
        );

        const alertSubject = "Frequent Login Attempts Detected";
        const alertText = `Dear ${username},

We noticed multiple failed login attempts on your account.

If you need help resetting your password, please contact support (techsaas26@gmail.com).

Best regards,
Techofes Tech Team`;

        // 🔥 Non-Blocking
        sendEmailSafely(user.email, alertSubject, alertText);
      }

      if (user.username !== "admin") await user.save();

      return res.status(401).json({ error: "Invalid username or password" });
    }

    user.failedAttempts = 0;
    if (user.username !== "admin") await user.save();

    const tokenPayload = { T_ID: user.T_ID, userType: user.userType };

    const token = jwt.sign(tokenPayload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY || "7d",
    });

    logger.info(
      `User logged in successfully: ${username} (T_ID: ${user.T_ID})`
    );

    res.status(200).json({
      token,
      username: user.username,
      T_ID: user.T_ID,
      userType: user.userType,
    });

  } catch (err) {
    logger.info(`Error during login: ${err.message}`);
    next(err);
  }
};

// ---------------- Logout ----------------
export const logoutUser = (req, res) => {
  logger.info("User logged out");
  res.status(200).json({ message: "Logout successful" });
};
