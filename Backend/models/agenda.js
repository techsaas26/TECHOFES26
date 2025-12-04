import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  day: { type: Number, enum: [1, 2], required: true },
  imgUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}); 

export default mongoose.model("Agenda", agendaSchema);