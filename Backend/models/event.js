import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    club: {
      type: String,
      required: true,
      trim: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    venue: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Club", "Iconic", "Signature", "Night Events"],
      required: true,
    },

    day: {
      type: Number,
      enum: [1, 2],
      required: true,
    },

    time: {
      type: String,
      enum: ["Day", "Night"],
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    fee: {
      type: Number,
      default: 0,
      min: 0,
    },

    capacity: {
      type: Number,
      default: null, // null = unlimited registrations
      min: 1,
    },

    registrationOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ======================
   Validations & Hooks
====================== */

// Ensure free events never have a fee
eventSchema.pre("save", function (next) {
  if (!this.isPaid) {
    this.fee = 0;
  }
  next();
});

/* ======================
   Instance Methods
====================== */

// Used while registering
eventSchema.methods.canRegister = function (currentCount = 0) {
  if (!this.registrationOpen) return false;
  if (this.capacity === null) return true;
  return currentCount < this.capacity;
};

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
