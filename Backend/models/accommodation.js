import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one accommodation per user
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    noOfNights: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // optional safety cap
    },

    paymentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

/* ======================
   Pricing Logic
====================== */
accommodationSchema.pre("save", function (next) {
  const PRICE_PER_NIGHT = 300;
  this.paymentAmount = this.noOfNights * PRICE_PER_NIGHT;
  next();
});

const Accommodation =
  mongoose.models.Accommodation ||
  mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
