// models/FoodAndBeverage.js
import mongoose from "mongoose";

const foodAndBeverageSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    offer: { type: Number, default: null },
    address: { type: [String], required: true },
    isAddressVisible: { type: Boolean, default: true },
    telegram: { type: [String], default: null },
    instagram: { type: [String], default: null },
    whatsappId: { type: [String], default: null },
    telephone: { type: [String], required: true },
    isTelephoneVisible: { type: Boolean, default: true },
    countryId: { type: String, ref: "Country", required: true }, // Foreign key to Country
    cityId: { type: Number, ref: "City", required: true }, // Foreign key to City
    url: { type: String, required: true },
    imageUrl: { type: [String], required: true }, // List of image URLs
  },
  { timestamps: true }
);

export default mongoose.model("FoodAndBeverage", foodAndBeverageSchema);
