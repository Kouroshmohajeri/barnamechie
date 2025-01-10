import mongoose from "mongoose";

const restaurantAndCafeSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String,
      ref: "User",
      required: true,
    }, // FK to User
    countryId: { type: String, ref: "Country", required: true }, // FK to Country
    cityId: { type: Number, ref: "City", required: true }, // FK to City
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["رستوران", "کافه"],
      required: true,
    }, // Restrict type to "رستوران" or "کافه"
    offer: { type: Number, default: null },
    url: { type: String, default: null }, // New field for URL
    website: { type: String, default: null },
    telegram: { type: String, default: null },
    menu: { type: String, default: null }, // URL to the menu
    imageUrl: { type: [String], default: [] }, // New field: list of image URLs
    address: { type: String, required: true },
    whatsappId: { type: String, default: null },
    instagram: { type: String, default: null },
    telephone: { type: String, required: true },
    openingHour: { type: String, required: true },
    closingHour: { type: String, required: true },
    priceRange: { type: Number, min: 1, max: 5, required: true }, // Allow decimals
    isReserveRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("RestaurantAndCafe", restaurantAndCafeSchema);
