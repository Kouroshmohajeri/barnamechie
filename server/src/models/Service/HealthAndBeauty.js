import mongoose from "mongoose";

const healthAndBeautySchema = new mongoose.Schema(
  {
    healthAndBeautyId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String, // Changed to String
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    desc: { type: String, required: true },
    address: { type: String, required: true },
    instagram: { type: String, default: null },
    telegram: { type: String, default: null },
    whatsapp: { type: String, default: null },
    website: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: [{ type: String }], // List of image URLs
  },
  { timestamps: true }
);

export default mongoose.model("HealthAndBeauty", healthAndBeautySchema);
