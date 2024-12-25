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
router.post("/", createCurrency);
router.get("/", getAllCurrencies);
router.get("/:currencyId", getCurrencyById);
router.put("/:currencyId", updateCurrency);
router.delete("/:currencyId", deleteCurrency);

export default router;
