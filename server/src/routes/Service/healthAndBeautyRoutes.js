import express from "express";
import HealthAndBeautyController from "../../controllers/Service/healthAndBeautyController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a Health and Beauty service
router.post(
  "/",
  authenticate, // Ensure user is logged in
  authorizeRoles("admin", "user"), // Only admin or user can create
  HealthAndBeautyController.createHealthAndBeauty
);

// Route to get all Health and Beauty services
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  HealthAndBeautyController.getAllHealthAndBeauty
);

// Route to get a specific Health and Beauty service by ID
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  HealthAndBeautyController.getHealthAndBeautyById
);

// Route to update a Health and Beauty service by ID
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can update
  HealthAndBeautyController.updateHealthAndBeauty
);

// Route to delete a Health and Beauty service by ID
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can delete
  HealthAndBeautyController.deleteHealthAndBeauty
);

export default router;
