import mongoose from "mongoose";

const currencySchema = new mongoose.Schema(
  {
    currencyId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
