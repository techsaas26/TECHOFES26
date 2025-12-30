import mongoose from "mongoose";

const userIdTrackerSchema = new mongoose.Schema({
  lastInsiderId: { type: Number, default: 2026000001 },
  lastOutsiderId: { type: Number, default: 2026100001 },
});

userIdTrackerSchema.statics.getNextInsiderId = async function () {
  const tracker = await this.findOneAndUpdate(
    {},
    { $inc: { lastInsiderId: 1 } },
    { new: true, upsert: true }
  );
  return `CEG${tracker.lastInsiderId}`;
};

userIdTrackerSchema.statics.getNextOutsiderId = async function () {
  const tracker = await this.findOneAndUpdate(
    {},
    { $inc: { lastOutsiderId: 1 } },
    { new: true, upsert: true }
  );
  return `EXT${tracker.lastOutsiderId}`;
};


// Get next Outsider ID
userIdTrackerSchema.statics.getNextOutsiderId = async function () {
  const tracker = await this.ensureTrackerExists();
  tracker.lastOutsiderId += 1;
  await tracker.save();
  return `EXT${tracker.lastOutsiderId}`;
};

export default mongoose.model("UserIdTracker", userIdTrackerSchema);
