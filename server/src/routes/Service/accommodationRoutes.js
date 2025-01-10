import express from "express";
import AccommodationController from "../../controllers/Service/accommodationController.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  AccommodationController.createAccommodation
);

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "user"),
  AccommodationController.getAllAccommodations
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "user"),
  AccommodationController.getAccommodationById
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  AccommodationController.updateAccommodation
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  AccommodationController.deleteAccommodation
);

export default router;
