import express from "express";
import EmployerController from "../../controllers/Service/employerController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployerController.createEmployer
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployerController.getAllEmployers
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployerController.getEmployerById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  EmployerController.updateEmployer
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  EmployerController.deleteEmployer
);

export default router;
