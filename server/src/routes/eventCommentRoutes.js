import express from "express";
import EventCommentController from "../controllers/eventCommentController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes that require authentication
router.use(authenticate);

// Route for creating a comment (any authenticated user can create a comment)
router.post("/", EventCommentController.createComment);

// Route for fetching a specific comment (any authenticated user can view)
router.get("/:id", EventCommentController.getCommentById);

// Route for updating a comment (only the owner or an admin can update)
router.put(
  "/:id",
  authorizeRoles("admin", "owner"),
  EventCommentController.updateComment
);

// Route for deleting a comment (only the owner or an admin can delete)
router.delete(
  "/:id",
  authorizeRoles("admin", "owner"),
  EventCommentController.deleteComment
);

// Route for fetching all comments (any authenticated user can view)
router.get("/", EventCommentController.getAllComments);

export default router;
