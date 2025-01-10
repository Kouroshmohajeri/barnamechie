import express from "express";
import SupermarketController from "../../controllers/Service/supermarketController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  SupermarketController.createSupermarket
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  SupermarketController.getAllSupermarkets
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  SupermarketController.getSupermarketById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  SupermarketController.updateSupermarket
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  SupermarketController.deleteSupermarket
);

export default router;
