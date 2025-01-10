import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    countryId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isSupported: { type: Boolean, default: false },
  },
  { _id: false }
); // Disable default MongoDB `_id` for this schema.

export default mongoose.model("Country", countrySchema);
