import express from "express";
import SubCategoryController from "../controllers/subCategoryController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes that require authentication
// router.use(authenticate);

// Route to create a new subcategory (only admin can create subcategories)
router.post("/", SubCategoryController.createSubCategory);

// Route to get a subcategory by its ID (accessible to any authenticated user)
router.get("/:id", SubCategoryController.getSubCategoryById);

// Route to update a subcategory (only admin can update subcategories)
router.put("/:id", SubCategoryController.updateSubCategory);

// Route to delete a subcategory (only admin can delete subcategories)
router.delete("/:id", SubCategoryController.deleteSubCategory);

// Route to get all subcategories (accessible to any authenticated user)
router.get("/", SubCategoryController.getAllSubCategories);

export default router;
