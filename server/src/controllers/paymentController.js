// src/controllers/paymentController.js
import PaymentRepository from "../repositories/paymentRepository.js";
import sendResponse from "../services/response.js";

class PaymentController {
  async createPayment(req, res) {
    try {
      const newPayment = await PaymentRepository.createPayment(req.body);
      sendResponse(res, 201, newPayment);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const payments = await PaymentRepository.getAllPayments();
      sendResponse(res, 200, payments);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await PaymentRepository.getPaymentById(req.params.id);
      payment
        ? sendResponse(res, 200, payment)
        : sendResponse(res, 404, { message: "Payment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async updatePayment(req, res) {
    try {
      const updatedPayment = await PaymentRepository.updatePayment(
        req.params.id,
        req.body
      );
      updatedPayment
        ? sendResponse(res, 200, updatedPayment)
        : sendResponse(res, 404, { message: "Payment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const deletedPayment = await PaymentRepository.deletePayment(
        req.params.id
      );
      deletedPayment
        ? sendResponse(res, 200, { message: "Payment deleted successfully" })
        : sendResponse(res, 404, { message: "Payment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }
}

export default new PaymentController();
