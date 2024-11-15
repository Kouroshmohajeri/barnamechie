// src/routes/serviceCommentRoutes.js
import express from "express";
import ServiceCommentController from "../controllers/serviceCommentController.js";

const router = express.Router();

router.post("/", ServiceCommentController.createComment);
router.get("/:id", ServiceCommentController.getCommentById);
router.put("/:id", ServiceCommentController.updateComment);
router.delete("/:id", ServiceCommentController.deleteComment);
router.get("/", ServiceCommentController.getAllComments);

export default router;
