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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      required: function () {
        return this.userType === "OUTSIDE";
      },
    },

    rollNo: {
      type: String,
      trim: true,
      required: function () {
        return this.userType === "CEG";
      },
    },

    department: {
      type: String,
      trim: true,
    },

    failedAttempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

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
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
