import express from "express";
import CurrencyController from "../../controllers/Service/currencyController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  CurrencyController.createCurrency
);

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  CurrencyController.getAllCurrencies
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  CurrencyController.getCurrencyById
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  CurrencyController.updateCurrency
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  CurrencyController.deleteCurrency
);

export default router;
