import express from "express";
import RestaurantAndCafeController from "../../controllers/Service/restaurantAndCafeController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  RestaurantAndCafeController.createRestaurantAndCafe
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  RestaurantAndCafeController.getAllRestaurantsAndCafes
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  RestaurantAndCafeController.getRestaurantAndCafeById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  RestaurantAndCafeController.updateRestaurantAndCafe
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  RestaurantAndCafeController.deleteRestaurantAndCafe
);

export default router;
