// src/routes/advertisementRoutes.js
import express from "express";
import AdvertisementController from "../controllers/advertisementController.js";

const router = express.Router();

router.post("/", AdvertisementController.createAdvertisement);
router.get("/:id", AdvertisementController.getAdvertisementById);
router.put("/:id", AdvertisementController.updateAdvertisement);
router.delete("/:id", AdvertisementController.deleteAdvertisement);
router.get("/", AdvertisementController.getAllAdvertisements);

export default router;
