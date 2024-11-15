// src/repositories/paymentRepository.js
import Payment from "../models/Payment.js";

class PaymentRepository {
  async createPayment(data) {
    return await Payment.create(data);
  }

  async getAllPayments() {
    return await Payment.find();
  }

  async getPaymentById(paymentId) {
    return await Payment.findById(paymentId);
  }

  async updatePayment(paymentId, data) {
    return await Payment.findByIdAndUpdate(paymentId, data, { new: true });
  }

  async deletePayment(paymentId) {
    return await Payment.findByIdAndDelete(paymentId);
  }
}

export default new PaymentRepository();
