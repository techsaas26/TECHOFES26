import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED", "WAITLISTED"],
      default: "CONFIRMED",
    },

    paymentStatus: {
      type: String,
      enum: ["NOT_REQUIRED", "PENDING", "SUCCESS", "FAILED"],
      default: "NOT_REQUIRED",
    },

    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

/* ======================
   Indexes
====================== */

// Prevent duplicate registration
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

/* ======================
   Hooks
====================== */

// Keep payment data consistent
registrationSchema.pre("save", function (next) {
  if (this.paymentStatus === "NOT_REQUIRED") {
    this.amountPaid = 0;
    this.transactionId = null;
  }

  if (this.paymentStatus === "SUCCESS" && this.amountPaid <= 0) {
    return next(new Error("Paid registration must have amountPaid"));
  }

  next();
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
