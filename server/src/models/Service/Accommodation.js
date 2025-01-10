import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String, // Keep this as String, based on your User model
      ref: "User",
      required: true,
    }, // FK to User
    desc: { type: String, required: true },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    }, // FK to Country
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    }, // FK to City
    isShortTerm: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, required: true },
    floor: { type: Number, required: true },
    neighborhood: { type: String, required: true },
    telegram: { type: String, default: null },
    telephone: { type: String, required: true },
    whatsappId: { type: String, default: null },
    type: {
      type: String,
      enum: ["اتاق اشتراکی", "آپارتمان", "اداری", "تجاری"],
      required: true,
    },
    pricePerMonth: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Accommodation", accommodationSchema);
