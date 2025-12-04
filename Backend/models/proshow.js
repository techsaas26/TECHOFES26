import mongoose from "mongoose";

const proShowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: Date },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('ProShow', proShowSchema);