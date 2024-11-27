import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  cityId: { type: Number, required: true, unique: true },
  cityName: { type: String, required: true },
  countryId: { type: String, required: true },
});

export default mongoose.model("City", citySchema);
