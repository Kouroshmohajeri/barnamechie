import mongoose from "mongoose";

const currencySchema = new mongoose.Schema(
  {
    currencyId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.String, // Referring to User model
      ref: "User",
      required: true,
    }, // FK to User
    desc: { type: String, required: true },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    }, // FK to City
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    }, // FK to Country
    telegram: { type: String, default: null },
    website: { type: String, default: null },
    instagram: { type: String, default: null },
    whatsapp: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Currency", currencySchema);
