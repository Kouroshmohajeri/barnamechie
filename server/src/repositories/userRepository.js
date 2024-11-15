// src/repositories/user.repository.js
import User from "../models/User.js";

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserById(userId) {
    return await User.findOne({ userId });
  }

  async updateUser(userId, updateData) {
    return await User.findOneAndUpdate({ userId }, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findOneAndDelete({ userId });
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserRepository();
