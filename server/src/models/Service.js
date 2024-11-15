// models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  price: { type: Number, required: true },
  offer: { type: Number, default: null },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  url: { type: String, required: true },
  imageUrl: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  fromHour: { type: String, default: null },
  toHour: { type: String, default: null },
  flightDate: { type: Date, default: null },
});

export default mongoose.model("Service", serviceSchema);
