// routes/foodAndBeverageRoutes.js
import express from "express";
import FoodAndBeverageController from "../../controllers/Service/foodAndBeverageController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  FoodAndBeverageController.createFoodAndBeverage
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  FoodAndBeverageController.getAllFoodAndBeverages
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  FoodAndBeverageController.getFoodAndBeverageById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  FoodAndBeverageController.updateFoodAndBeverage
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  FoodAndBeverageController.deleteFoodAndBeverage
);

export default router;
