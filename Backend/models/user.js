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
      enum: ["CEG", "OUTSIDE", "admin"], //IMPORTANT: admin is not an option during registration in frontend
      required: true,
    },

    username: { type: String, unique: true, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },

    passwordHash: { type: String, required: true },

    phoneNumber: { type: String, required: true },

    college: {
      type: String,
      required: function () {
        return this.userType === "OUTSIDE";
      },
    },

    rollNo: {
      type: String,
      required: function () {
        return this.userType === "CEG";
      },
    },

    failedAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

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

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
