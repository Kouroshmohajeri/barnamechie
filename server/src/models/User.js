// src/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateOfJoining: { type: Date, default: Date.now },
  points: { type: Number, default: 0 },
  numberOfInvitations: { type: Number, default: 0 },
  invitationLink: { type: String, unique: true },
  numberOfAds: { type: Number, default: 0 },
  lastAd: { type: Date },
  numberOfServices: { type: Number, default: 0 },
  lastService: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export default mongoose.model("User", userSchema);
