// src/models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gateway: { type: String, required: true },
    numberOfPayment: { type: String, required: true }, // unique payment reference number
    date: { type: Date, default: Date.now },
    isSuccessful: { type: Boolean, default: false },
    isService: { type: Boolean, default: false },
    isEvent: { type: Boolean, default: false },
    transactionDetails: {
      // extra details for bank transfers
      accountNumber: { type: String, required: false },
      bankName: { type: String, required: false },
      transactionId: { type: String, required: false },
      amount: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
