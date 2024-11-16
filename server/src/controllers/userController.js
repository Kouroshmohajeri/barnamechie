import UserRepository from "../repositories/userRepository.js";
import sendResponse from "../services/response.js";

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await UserRepository.createUser(req.body);
      sendResponse(res, 201, true, newUser, "User created successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        false,
        null,
        error.message || "Error creating user"
      );
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserRepository.getUserById(req.params.userId);
      user
        ? sendResponse(res, 200, true, user, "User retrieved successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(
        res,
        500,
        false,
        null,
        error.message || "Error fetching user"
      );
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const loggedInUser = req.user;

      // Check if the logged-in user is authorized to update
      if (loggedInUser.role !== "admin" && loggedInUser.id !== userId) {
        return sendResponse(
          res,
          403,
          false,
          null,
          "Unauthorized to update this user"
        );
      }

      // Restrict fields for non-admins
      const allowedFields =
        loggedInUser.role === "admin"
          ? ["firstname", "lastname", "points", "isVerified", "role"] // Admins can update these
          : ["firstname", "lastname"]; // Regular users can update only these

      const updates = Object.keys(req.body);
      const isValidUpdate = updates.every((field) =>
        allowedFields.includes(field)
      );

      if (!isValidUpdate) {
        return sendResponse(
          res,
          400,
          false,
          null,
          "Invalid fields in update request"
        );
      }

      const updatedUser = await UserRepository.updateUser(userId, req.body);
      updatedUser
        ? sendResponse(res, 200, true, updatedUser, "User updated successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(
        res,
        500,
        false,
        null,
        error.message || "Error updating user"
      );
    }
  }

  async deleteUser(req, res) {
    try {
      const loggedInUser = req.user;

      // Only admins can delete users
      if (loggedInUser.role !== "admin") {
        return sendResponse(
          res,
          403,
          false,
          null,
          "Unauthorized to delete user"
        );
      }

      const deletedUser = await UserRepository.deleteUser(req.params.userId);
      deletedUser
        ? sendResponse(res, 200, true, null, "User deleted successfully")
        : sendResponse(res, 404, false, null, "User not found");
    } catch (error) {
      sendResponse(
        res,
        500,
        false,
        null,
        error.message || "Error deleting user"
      );
    }
  }

  async getAllUsers(req, res) {
    try {
      const loggedInUser = req.user;

      // Only admins can fetch all users
      if (loggedInUser.role !== "admin") {
        return sendResponse(
          res,
          403,
          false,
          null,
          "Unauthorized to fetch users"
        );
      }

      const users = await UserRepository.getAllUsers();
      sendResponse(res, 200, true, users, "Users retrieved successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        false,
        null,
        error.message || "Error fetching users"
      );
    }
  }
}

export default new UserController();
