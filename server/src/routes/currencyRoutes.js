import express from "express";
import {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
} from "../controllers/currencyController.js";

const router = express.Router();

// Routes for Currency
router.post("/currencies", createCurrency);
router.get("/currencies", getAllCurrencies);
router.get("/currencies/:currencyId", getCurrencyById);
router.put("/currencies/:currencyId", updateCurrency);
router.delete("/currencies/:currencyId", deleteCurrency);

export default router;
