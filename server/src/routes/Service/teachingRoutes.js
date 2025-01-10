import express from "express";
import TeachingController from "../../controllers/Service/teachingController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  TeachingController.createTeaching
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  TeachingController.getAllTeachings
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  TeachingController.getTeachingById
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  TeachingController.updateTeaching
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  TeachingController.deleteTeaching
);

export default router;
