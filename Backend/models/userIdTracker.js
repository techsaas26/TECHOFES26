import mongoose from "mongoose";

const userIdTrackerSchema = new mongoose.Schema({
  lastInsiderId: { type: Number, default: 2026000000 }, // start one before first
  lastOutsiderId: { type: Number, default: 2026100000 }, // start one before first
});

// Increment and get next Insider ID
userIdTrackerSchema.statics.getNextInsiderId = async function () {
  // Delete invalid tracker if lastInsiderId < default
  const tracker = await this.findOneAndUpdate(
    {},
    { $inc: { lastInsiderId: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // Safety check: if accidentally less than default, reset
  if (tracker.lastInsiderId < 2026000001) {
    tracker.lastInsiderId = 2026000001;
    await tracker.save();
  }

  return `CEG${tracker.lastInsiderId}`;
};

// Increment and get next Outsider ID
userIdTrackerSchema.statics.getNextOutsiderId = async function () {
  const tracker = await this.findOneAndUpdate(
    {},
    { $inc: { lastOutsiderId: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // Safety check
  if (tracker.lastOutsiderId < 2026100001) {
    tracker.lastOutsiderId = 2026100001;
    await tracker.save();
  }

  return `EXT${tracker.lastOutsiderId}`;
};

// Prevent OverwriteModelError
const UserIdTracker =
  mongoose.models.UserIdTracker ||
  mongoose.model("UserIdTracker", userIdTrackerSchema);

export default UserIdTracker;
