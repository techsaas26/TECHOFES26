import mongoose from "mongoose";

/* ======================
   Size Sub-Schema
====================== */
const sizeItemSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

/* ======================
   Merch Order Schema
====================== */
const merchOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // What the user is buying
    purchaseType: {
      type: String,
      enum: [
        "SINGLE_SHIRT", // 1 shirt → ₹200
        "FIVE_SHIRT_COMBO", // 5 shirts → ₹1000
        "SHIRT_TICKET_COMBO", // 1 shirt + ticket → ₹300
      ],
      required: true,
    },

    // Shirt sizes (only non-zero quantities stored)
    sizes: {
      type: [sizeItemSchema],
      required: true,
      validate: [
        {
          validator: (v) => Array.isArray(v) && v.length > 0,
          message: "At least one shirt size is required",
        },
      ],
    },

    totalItems: {
      type: Number,
      default: 0,
    },

    totalAmount: {
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
   Validation + Pricing
====================== */
merchOrderSchema.pre("save", function (next) {
  const totalShirts = this.sizes.reduce((sum, item) => sum + item.quantity, 0);

  this.totalItems = totalShirts;

  switch (this.purchaseType) {
    case "SINGLE_SHIRT":
      if (totalShirts !== 1) {
        return next(new Error("SINGLE_SHIRT must contain exactly 1 shirt"));
      }
      this.totalAmount = 180;
      break;

    case "FIVE_SHIRT_COMBO":
      if (totalShirts !== 5) {
        return next(
          new Error("FIVE_SHIRT_COMBO must contain exactly 5 shirts")
        );
      }
      this.totalAmount = 900;
      break;

    case "SHIRT_TICKET_COMBO":
      if (totalShirts !== 1) {
        return next(
          new Error("SHIRT_TICKET_COMBO must contain exactly 1 shirt")
        );
      }
      this.totalAmount = 300;
      break;

    default:
      return next(new Error("Invalid purchase type"));
  }

  next();
});

const MerchOrder =
  mongoose.models.MerchOrder || mongoose.model("MerchOrder", merchOrderSchema);

export default MerchOrder;
