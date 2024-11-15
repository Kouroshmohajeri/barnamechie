// src/repositories/serviceCommentRepository.js
import ServiceComment from "../models/ServiceComment.js";

class ServiceCommentRepository {
  async createComment(data) {
    return await ServiceComment.create(data);
  }

  async getAllComments() {
    return await ServiceComment.find();
  }

  async getCommentById(commentId) {
    return await ServiceComment.findById(commentId);
  }

  async updateComment(commentId, data) {
    return await ServiceComment.findByIdAndUpdate(commentId, data, {
      new: true,
    });
  }

  async deleteComment(commentId) {
    return await ServiceComment.findByIdAndDelete(commentId);
  }
}

export default new ServiceCommentRepository();
