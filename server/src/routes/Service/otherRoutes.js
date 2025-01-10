import express from "express";
import OtherController from "../../controllers/Service/otherController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route to create an Other service
router.post(
  "/",
  authenticate, // Ensure user is logged in
  authorizeRoles("admin", "user"), // Only admin or user can create
  OtherController.createOther
);

// Route to get all Other services
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  OtherController.getAllOthers
);

// Route to get a specific Other service by ID
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  OtherController.getOtherById
);

// Route to update an Other service by ID
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can update
  OtherController.updateOther
);

// Route to delete an Other service by ID
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can delete
  OtherController.deleteOther
);

export default router;
