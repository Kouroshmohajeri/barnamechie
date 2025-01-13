import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subCategoryId: {
      type: String,
      ref: "SubCategory",
      required: true,
    },
    currencyId: {
      type: Number,
      ref: "Currency",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String], // Now accepts an array of strings
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) && value.every((v) => typeof v === "string")
          );
        },
        message: "imageUrl must be an array of strings",
      },
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    dateOfPublish: {
      type: Date,
      default: Date.now,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
