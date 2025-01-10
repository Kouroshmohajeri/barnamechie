import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String,
      ref: "User",
      required: true,
    }, // FK to User
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
    title: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, min: 18, max: 100 },
    description: { type: String },
    url: { type: String, default: null },
    imageUrl: { type: String, default: null },
    resumeUrl: { type: String, default: null },
    portfolioWebsite: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
