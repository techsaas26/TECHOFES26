import User from "../models/user.js";
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
    const {
      username,
<<<<<<< HEAD
      firstName,
      lastName,
      email,
      phoneNumber,
=======
      fullName,
      email,
      phoneNumber,
      collegeName,
      department,
>>>>>>> upstream/main
      rollNo,
      password,
      userType,
    } = req.body;

<<<<<<< HEAD
=======
    // Basic validation
    if (!username || !email || !password || !userType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

>>>>>>> upstream/main
    if (!["CEG", "OUTSIDE"].includes(userType)) {
      return res
        .status(400)
        .json({ error: "Invalid userType. Must be CEG or OUTSIDE" });
    }

    logger.info(
      `Register attempt | username: ${username} | email: ${email} | type: ${userType}`,
    );

<<<<<<< HEAD
    // Check duplicates
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      logger.warn(
        `Registration failed: username/email already in use (${username} / ${email})`,
=======
    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check duplicates
    const existingUser = await User.findOne({
      $or: [{ username }, { email: normalizedEmail }],
    });

    if (existingUser) {
      logger.warn(
        `Registration failed: username/email already in use (${username} / ${normalizedEmail})`,
>>>>>>> upstream/main
      );
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }

    // Hash password
<<<<<<< HEAD
    const passwordHash = await bcrypt.hash(password, 10);
=======
    const passwordHash = await bcrypt.hash(password, 12);
>>>>>>> upstream/main

    // Generate T_ID
    const T_ID =
      userType === "CEG"
        ? await UserIdTracker.getNextInsiderId()
        : await UserIdTracker.getNextOutsiderId();

<<<<<<< HEAD
    const userData = {
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      passwordHash,
      userType,
      rollNo: userType === "CEG" ? rollNo : undefined,
      college: userType === "CEG" ? "CEG" : req.body.college || "N/A",
    };

    const user = new User(userData);
=======
    const user = new User({
      T_ID,
      username,
      fullName,
      email: normalizedEmail,
      phoneNumber,
      passwordHash,
      userType,
      rollNo,
      college: userType === "CEG" ? "College of Engineering Guindy" : collegeName,
      department,
    });

>>>>>>> upstream/main
    const savedUser = await user.save();

    logger.info(
      `User registered successfully: ${savedUser.username} (T_ID: ${savedUser.T_ID})`,
    );

    // Optional confirmation email
    const subject = "Registration Confirmation";
<<<<<<< HEAD
    const text = `Dear ${savedUser.firstName},\n\nThank you for registering! Your unique T_ID is: ${savedUser.T_ID} and username is: "${savedUser.username}".\n\nBest regards,\nTechofes Tech Team`;
    await sendMail(savedUser.email, subject, text);

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
=======
    const text = `Dear ${savedUser.fullName},

Thank you for registering!
Your unique T_ID is: ${savedUser.T_ID}
Username: ${savedUser.username}

Best regards,
Tech Team`;

    await sendMail(savedUser.email, subject, text);

    // Convert to object and remove passwordHash safely
    const userResponse = savedUser.toObject();
    delete userResponse.passwordHash;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
>>>>>>> upstream/main
  } catch (err) {
    logger.error(`Error during registration: ${err.stack}`);
    next(err);
  }
};

// ---------------- Login ----------------
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    logger.info(`Login attempt for username: ${username}`);

<<<<<<< HEAD
    const user = await User.findOne({ username });
=======
    const user = await User.findOne({ username }).select("+passwordHash");

>>>>>>> upstream/main
    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= MAX_ATTEMPTS && user.username !== "admin") {
        logger.warn(
          `User ${username} exceeded max login attempts. Sending alert email.`,
        );
        await sendMail(
          user.email,
          "Frequent Login Attempts Detected",
          `Dear ${username},\n\nWe noticed multiple failed login attempts on your account.\n\nIf you need help resetting your password, please contact support (techsaas26@gmail.com).\n\nBest regards,\nTechofes Tech Team`,
        );
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
      `User logged in successfully: ${username} (T_ID: ${user.T_ID})`,
    );

    res.status(200).json({
      token,
      username: user.username,
      T_ID: user.T_ID,
      userType: user.userType,
    });
  } catch (err) {
    logger.error(`Error during login: ${err.stack}`);
    next(err);
  }
};

// ---------------- Logout ----------------
export const logoutUser = (req, res) => {
  logger.info("User logged out");
  res.status(200).json({ message: "Logout successful" });
};
