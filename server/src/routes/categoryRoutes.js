// src/routes/categoryRoutes.js
import express from "express";
import CategoryController from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.get("/", CategoryController.getAllCategories);

export default router;
