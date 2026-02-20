import mongoose from "mongoose";
import UserIdTracker from "./userIdTracker.js";

const userSchema = new mongoose.Schema(
  {
    T_ID: {
      type: String,
      unique: true,
      index: true,
    },

    userType: {
      type: String,
      enum: ["CEG", "OUTSIDE", "admin"],
      required: true,
<<<<<<< HEAD
    },

    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
=======
      index: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },
>>>>>>> upstream/main

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
<<<<<<< HEAD
      match: /.+\@.+\..+/,
    },

    passwordHash: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    college: {
      type: String,
=======
      trim: true,
      match: /.+\@.+\..+/,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      trim: true,
>>>>>>> upstream/main
      required: function () {
        return this.userType === "OUTSIDE";
      },
    },

    rollNo: {
      type: String,
<<<<<<< HEAD
=======
      trim: true,
>>>>>>> upstream/main
      required: function () {
        return this.userType === "CEG";
      },
    },

<<<<<<< HEAD
    failedAttempts: { type: Number, default: 0 },
=======
    department: {
      type: String,
      trim: true,
    },

    failedAttempts: {
      type: Number,
      default: 0,
    },
>>>>>>> upstream/main
  },
  { timestamps: true },
);

<<<<<<< HEAD
// Pre-validation hook to generate T_ID
userSchema.pre("validate", async function (next) {
  if (!this.T_ID) {
    if (this.userType === "CEG") {
      this.T_ID = await UserIdTracker.getNextInsiderId();
    } else if (this.userType === "OUTSIDE") {
      this.T_ID = await UserIdTracker.getNextOutsiderId();
    }
  }
  next();
});

// Hide sensitive fields in JSON
=======
// Auto-generate T_ID before validation
userSchema.pre("validate", async function (next) {
  try {
    if (!this.T_ID) {
      if (this.userType === "CEG") {
        this.T_ID = await UserIdTracker.getNextInsiderId();
      } else if (this.userType === "OUTSIDE") {
        this.T_ID = await UserIdTracker.getNextOutsiderId();
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Clean JSON output
>>>>>>> upstream/main
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
<<<<<<< HEAD
    delete ret.passwordHash;
=======
    return ret;
>>>>>>> upstream/main
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
<<<<<<< HEAD
=======

>>>>>>> upstream/main
export default User;
