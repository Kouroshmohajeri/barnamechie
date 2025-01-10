import mongoose from "mongoose";

const teachingSchema = new mongoose.Schema(
  {
    teachingId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
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
    type: {
      type: String,
      enum: ["آنلاین", "حضوری"],
      required: true,
    },
    price: { type: Number, required: true },
    offer: { type: Number, default: 0 }, // Discount or offer percentage
    telegram: { type: String, default: null },
    instagram: { type: String, default: null },
    whatsapp: { type: String, default: null },
    email: { type: String, default: null },
    website: { type: String, default: null },
    address: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Teaching", teachingSchema);
