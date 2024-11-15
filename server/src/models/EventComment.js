// src/models/EventComment.js
import mongoose from "mongoose";

const EventCommentSchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRejected: { type: Boolean, default: false },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EventComment", EventCommentSchema);
