import express from "express";
import UserController from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", UserController.createUser); // Public route for user creation

// Protected routes: Any authenticated user can access their own data
router.get(
  "/:userId",
  authenticate,
  authorizeRoles("user"),
  UserController.getUserById
); // Any authenticated user can get a user
router.put(
  "/:userId",
  authenticate,
  authorizeRoles("user"),
  UserController.updateUser
); // Any authenticated user can update their own data

// Admin-only routes
router.delete(
  "/:userId",
  authenticate,
  authorizeRoles("admin"),
  UserController.deleteUser
); // Only admins can delete users
router.get(
  "/",
  authenticate,
  authorizeRoles("admin"),
  UserController.getAllUsers
); // Only admins can list all users

export default router;
