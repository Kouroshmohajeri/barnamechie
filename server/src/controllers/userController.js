// src/controllers/userController.js
import UserRepository from "../repositories/userRepository.js";
import sendResponse from "../services/response.js";

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await UserRepository.createUser(req.body);
      sendResponse(res, 201, true, newUser, "User created successfully");
    } catch (error) {
      sendResponse(res, 500, false, null, "Error creating user");
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserRepository.getUserById(req.params.userId);
      user
        ? sendResponse(res, 200, true, user, "User retrieved successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(res, 500, false, null, "Error fetching user");
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserRepository.updateUser(
        req.params.userId,
        req.body
      );
      updatedUser
        ? sendResponse(res, 200, true, updatedUser, "User updated successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(res, 500, false, null, "Error updating user");
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserRepository.deleteUser(req.params.userId);
      deletedUser
        ? sendResponse(res, 200, true, null, "User deleted successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(res, 500, false, null, "Error deleting user");
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      sendResponse(res, 200, true, users, "Users retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, false, null, "Error fetching users");
    }
  }
}

export default new UserController();
