import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
} from "../controllers/imageController.js";

const router = Router();

// Upload an image
router.post("/upload", upload.single("image"), uploadImage);

// Get all images
router.get("/", getImages);

// Delete an image by filename
router.delete("/:filename", deleteImage);

// Update/Replace an image
router.put("/:filename", upload.single("image"), updateImage);

export default router;
