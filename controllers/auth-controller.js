import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mail.js";
import logger from "../utils/logger.js";
import config from "../utils/config.js";
import UserIdTracker from "../models/userIdTracker.js";

const MAX_ATTEMPTS = 3;

// ---------------- Register ----------------
export const registerUser = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, phn, rollno, password } = req.body;
    const college = "CEG";

    logger.info(`Register attempt for username: ${username}, email: ${email}`);

    const existingUser = await User.findOne({ $or: [{ username }, { emailID: email }] });
    if (existingUser) {
      logger.warn(`Registration failed: username/email already in use (${username} / ${email})`);
      return res.status(400).json({ error: "Username or email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const T_ID = await UserIdTracker.getNextId(); // generate unique insider ID

    const user = new User({
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber: phn,
      rollNo: rollno,
      passwordHash,
      college,
    });

    const savedUser = await user.save();
    logger.info(`User registered successfully: ${savedUser.username} (T_ID: ${savedUser.T_ID})`);

    const subject = "Registration Confirmation";
    const text = `Dear ${savedUser.firstName},\n\nThank you for registering! Your unique T_ID is: ${savedUser.T_ID} and username is: "${savedUser.username}".\n\nBest regards,\nEvent Team`;

    // sendMail can throw; optionally catch/log inside sendMail itself
    // await sendMail(savedUser.emailID, subject, text);

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    logger.error(`Error during registration: ${err.stack}`);
    next(err); // use centralized error handler
  }
};

// ---------------- Login ----------------
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    logger.info(`Login attempt for username: ${username}`);

    const user = await User.findOne({ username });
    if (!user) {
      logger.warn(`Login failed: user not found (${username})`);
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      user.failedAttempts += 1;

      if (user.failedAttempts >= MAX_ATTEMPTS && user.username !== "admin") {
        logger.warn(`User ${username} exceeded max login attempts. Sending alert email.`);
        await sendMail(
          user.emailID,
          "Frequent Login Attempts Detected",
          `Dear ${username},\n\nWe noticed multiple failed login attempts on your account.\n\nIf you need help resetting your password, please contact support.\n\nBest regards,\nEvent Team`
        );
      }

      if (user.username !== "admin") await user.save();
      return res.status(401).json({ error: "Invalid username or password" });
    }

    user.failedAttempts = 0;
    if (user.username !== "admin") await user.save();

    const tokenPayload = { T_ID: user.T_ID };
    const token = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY || "7d" });

    logger.info(`User logged in successfully: ${username} (T_ID: ${user.T_ID})`);

    res.status(200).json({
      token,
      username: user.username,
      T_ID: user.T_ID,
    });
  } catch (err) {
    logger.error(`Error during login: ${err.stack}`);
    next(err); // forward to centralized error handler
  }
};

// ---------------- Logout ----------------
export const logoutUser = (req, res) => {
  logger.info("User logged out");
  res.status(200).json({ message: "Logout successful" });
};
