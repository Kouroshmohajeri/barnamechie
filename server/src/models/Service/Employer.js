import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: String,
      ref: "User",
      required: true,
    }, // FK to User
    title: { type: String, required: true },
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
    type: {
      type: String,
      enum: ["پروژه", "حضوری", "ریموت", "هایبرید"],
      required: true,
    },
    salaryPerHour: { type: Number, required: true },
    currency: { type: String, required: true },
    jobDescription: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    website: { type: String, default: null },
    telegram: { type: String, default: null },
    instagram: { type: String, default: null },
    url: { type: String, default: null },
    imageUrl: { type: String, default: null },
    hours: { type: String, enum: ["تمام وقت", "نیمه وقت"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Employer", employerSchema);
