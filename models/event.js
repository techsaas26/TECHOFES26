import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  club : { type: String, required: true },
  imgUrl: { type: String, required: true },
  description: { type: String },
  venue: { type: String },
  type: { type: String, enum: ['Club', 'Iconic', 'Signature', 'Night Events'], required: true },
  day: { type: Number, enum: [1, 2], required: true },
  time: { type: String, enum: ['Day', 'Night'], required: true },
  isPaid: { type: Boolean, default: false },
  fee: { type: Number, default: 0 },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);