import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  cityId: { type: String, required: true, unique: true },
  cityName: { type: String, required: true },
  countryId: { type: String, ref: "Country", required: true },
});

export default mongoose.model("City", citySchema);
