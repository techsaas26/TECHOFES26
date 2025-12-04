import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  registrationDate: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

// Compound unique index: a user can register only once for a particular event
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
