import express from "express";
import RepareController from "../../controllers/Service/repareController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a Repare service
router.post(
  "/",
  authenticate, // Ensure user is logged in
  authorizeRoles("admin", "user"), // Only admin or user can create
  RepareController.createRepare
);

// Route to get all Repare services
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  RepareController.getAllRepare
);

// Route to get a specific Repare service by ID
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  RepareController.getRepareById
);

// Route to update a Repare service by ID
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can update
  RepareController.updateRepare
);

// Route to delete a Repare service by ID
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can delete
  RepareController.deleteRepare
);

export default router;
