// src/routes/paymentRoutes.js
import express from "express";
import PaymentController from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", PaymentController.createPayment);
router.get("/:id", PaymentController.getPaymentById);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);
router.get("/", PaymentController.getAllPayments);

export default router;
