// src/repositories/eventCommentRepository.js
import EventComment from "../models/EventComment.js";

class EventCommentRepository {
  async createComment(data) {
    return await EventComment.create(data);
  }

  async getAllComments() {
    return await EventComment.find();
  }

  async getCommentById(commentId) {
    return await EventComment.findById(commentId);
  }

  async updateComment(commentId, data) {
    return await EventComment.findByIdAndUpdate(commentId, data, { new: true });
  }

  async deleteComment(commentId) {
    return await EventComment.findByIdAndDelete(commentId);
  }
}

export default new EventCommentRepository();
