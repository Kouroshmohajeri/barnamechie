import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes that require authentication
router.use(authenticate);

// Route to create a new category (only admin can create categories)
router.post("/", authorizeRoles("admin"), CategoryController.createCategory);

// Route to get a category by its ID (accessible to any authenticated user)
router.get("/:id", CategoryController.getCategoryById);

// Route to update a category (only admin can update categories)
router.put("/:id", authorizeRoles("admin"), CategoryController.updateCategory);

// Route to delete a category (only admin can delete categories)
router.delete(
  "/:id",
  authorizeRoles("admin"),
  CategoryController.deleteCategory
);

// Route to get all categories (accessible to any authenticated user)
router.get("/", CategoryController.getAllCategories);

export default router;
