// src/models/ServiceComment.js
import mongoose from "mongoose";

const ServiceCommentSchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRejected: { type: Boolean, default: false },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceComment", ServiceCommentSchema);
