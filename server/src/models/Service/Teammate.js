import mongoose from "mongoose";

const teammateSchema = new mongoose.Schema(
  {
    teammateId: {
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
    desc: { type: String, required: true },
    competition: { type: String, required: true },
    type: {
      type: String,
      enum: ["آنلاین", "حضوری"],
      required: true,
    },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    telegram: { type: String, default: null },
    whatsapp: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: [{ type: String }], // List of image URLs
    entryPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Teammate", teammateSchema);
