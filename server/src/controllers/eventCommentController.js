import EventCommentRepository from "../repositories/eventCommentRepository.js";
import sendResponse from "../services/response.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js"; // Import middleware

class EventCommentController {
  async createComment(req, res) {
    try {
      const newComment = await EventCommentRepository.createComment(req.body);
      sendResponse(res, 201, newComment, "Comment created successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error creating comment", error);
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await EventCommentRepository.getAllComments();
      sendResponse(res, 200, comments, "Comments retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching comments", error);
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await EventCommentRepository.getCommentById(
        req.params.id
      );
      comment
        ? sendResponse(res, 200, comment, "Comment retrieved successfully")
        : sendResponse(res, 404, null, "Comment not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching comment", error);
    }
  }

  async updateComment(req, res) {
    try {
      // Ensure the user is either the owner of the comment or an admin
      const updatedComment = await EventCommentRepository.updateComment(
        req.params.id,
        req.body
      );
      updatedComment
        ? sendResponse(res, 200, updatedComment, "Comment updated successfully")
        : sendResponse(res, 404, null, "Comment not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating comment", error);
    }
  }

  async deleteComment(req, res) {
    try {
      // Ensure the user is either the owner of the comment or an admin
      const deletedComment = await EventCommentRepository.deleteComment(
        req.params.id
      );
      deletedComment
        ? sendResponse(
            res,
            200,
            { message: "Comment deleted successfully" },
            "Comment deleted successfully"
          )
        : sendResponse(res, 404, null, "Comment not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting comment", error);
    }
  }
}

export default new EventCommentController();
