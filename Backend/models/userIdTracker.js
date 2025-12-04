import mongoose from "mongoose";

const userIdTrackerSchema = new mongoose.Schema({
  lastInsiderId: { type: Number, default: 2026000001 },
  lastOutsiderId: { type: Number, default: 2026100001 },
});

// Ensure tracker exists
userIdTrackerSchema.statics.ensureTrackerExists = async function () {
  let tracker = await this.findOne();
  if (!tracker) {
    tracker = new this();
    await tracker.save();
  }
  return tracker;
};

// Get next Insider ID
userIdTrackerSchema.statics.getNextInsiderId = async function () {
  const tracker = await this.ensureTrackerExists();
  tracker.lastInsiderId += 1;
  await tracker.save();
  return `CEG${tracker.lastInsiderId}`;
};

// Get next Outsider ID
userIdTrackerSchema.statics.getNextOutsiderId = async function () {
  const tracker = await this.ensureTrackerExists();
  tracker.lastOutsiderId += 1;
  await tracker.save();
  return `EXT${tracker.lastOutsiderId}`;
};

export default mongoose.model("UserIdTracker", userIdTrackerSchema);
