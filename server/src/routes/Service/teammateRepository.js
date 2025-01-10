import express from "express";
import TeammateController from "../../controllers/Service/teammateController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a Teammate service
router.post(
  "/",
  authenticate, // Ensure user is logged in
  authorizeRoles("admin", "user"), // Only admin or user can create
  TeammateController.createTeammate
);

// Route to get all Teammate services
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  TeammateController.getAllTeammates
);

// Route to get a specific Teammate service by ID
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  TeammateController.getTeammateById
);

// Route to update a Teammate service by ID
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can update
  TeammateController.updateTeammate
);

// Route to delete a Teammate service by ID
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"), // Only admin can delete
  TeammateController.deleteTeammate
);

export default router;
