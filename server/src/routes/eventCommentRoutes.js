// src/routes/eventCommentRoutes.js
import express from "express";
import EventCommentController from "../controllers/eventCommentController.js";

const router = express.Router();

router.post("/", EventCommentController.createComment);
router.get("/:id", EventCommentController.getCommentById);
router.put("/:id", EventCommentController.updateComment);
router.delete("/:id", EventCommentController.deleteComment);
router.get("/", EventCommentController.getAllComments);

export default router;
