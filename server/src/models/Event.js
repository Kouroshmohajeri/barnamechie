import mongoose from "mongoose";
import { generateUniqueUrl } from "../middleware/preSaveMiddleware.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String, // Ensure this field exists
      unique: true, // Ensure uniqueness in the database
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
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
    offer: {
      type: Number,
      default: null,
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
    link: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Attach middleware
eventSchema.pre("save", generateUniqueUrl);

const Event = mongoose.model("Event", eventSchema);

export default Event;
