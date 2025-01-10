import mongoose from "mongoose";

const repareSchema = new mongoose.Schema(
  {
    repareId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // FK to User model
      required: true,
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", // FK to City model
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country", // FK to Country model
      required: true,
    },
    instagram: { type: String, default: null },
    telegram: { type: String, default: null },
    whatsapp: { type: String, default: null },
    website: { type: String, default: null },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    url: { type: String, default: null },
    imageUrl: [{ type: String }], // List of image URLs
  },
  { timestamps: true }
);

export default mongoose.model("Repare", repareSchema);
