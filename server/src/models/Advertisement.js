// src/models/Advertisement.js
import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema(
  {
    advertismentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    link: { type: String, default: null },
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    isPaid: { type: Boolean, default: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", AdvertisementSchema);
