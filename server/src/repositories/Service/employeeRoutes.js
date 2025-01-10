import express from "express";
import EmployeeController from "../../controllers/Service/employeeController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployeeController.createEmployee
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployeeController.getAllEmployees
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  EmployeeController.getEmployeeById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  EmployeeController.updateEmployee
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  EmployeeController.deleteEmployee
);

export default router;
