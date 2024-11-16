import express from "express";
import AdvertisementController from "../controllers/advertisementController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes with authentication
router.use(authenticate);

// Route for creating an advertisement (any authenticated user can create)
router.post("/", AdvertisementController.createAdvertisement);

// Route for fetching a specific advertisement (any authenticated user can access)
router.get("/:id", AdvertisementController.getAdvertisementById);

// Route for updating an advertisement (only the owner or an admin can update)
router.put(
  "/:id",
  authorizeRoles("user", "admin"),
  AdvertisementController.updateAdvertisement
);

// Route for deleting an advertisement (only the owner or admin can delete)
router.delete(
  "/:id",
  authorizeRoles("admin", "user"),
  AdvertisementController.deleteAdvertisement
);

// Route for fetching all advertisements (any authenticated user can access)
router.get("/", AdvertisementController.getAllAdvertisements);

export default router;
