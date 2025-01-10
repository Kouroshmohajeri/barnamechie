import mongoose from "mongoose";

const supermarketSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: { type: String, ref: "User", required: true }, // FK to User
    countryId: { type: String, ref: "Country", required: true }, // FK to Country
    cityId: { type: Number, ref: "City", required: true }, // FK to City
    title: { type: String, required: true },
    desc: { type: String, required: true },
    openingHour: { type: String, required: true },
    closingHour: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    instagram: { type: String, default: null },
    telegram: { type: String, default: null },
    whatsappId: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: { type: [String], default: [] }, // List of image URLs
  },
  { timestamps: true }
);

export default mongoose.model("Supermarket", supermarketSchema);
