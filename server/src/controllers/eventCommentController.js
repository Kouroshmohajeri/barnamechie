// src/controllers/eventCommentController.js
import EventCommentRepository from "../repositories/eventCommentRepository.js";
import sendResponse from "../services/response.js";

class EventCommentController {
  async createComment(req, res) {
    try {
      const newComment = await EventCommentRepository.createComment(req.body);
      sendResponse(res, 201, newComment);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await EventCommentRepository.getAllComments();
      sendResponse(res, 200, comments);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await EventCommentRepository.getCommentById(
        req.params.id
      );
      comment
        ? sendResponse(res, 200, comment)
        : sendResponse(res, 404, { message: "Comment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const updatedComment = await EventCommentRepository.updateComment(
        req.params.id,
        req.body
      );
      updatedComment
        ? sendResponse(res, 200, updatedComment)
        : sendResponse(res, 404, { message: "Comment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const deletedComment = await EventCommentRepository.deleteComment(
        req.params.id
      );
      deletedComment
        ? sendResponse(res, 200, { message: "Comment deleted successfully" })
        : sendResponse(res, 404, { message: "Comment not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }
}

export default new EventCommentController();
