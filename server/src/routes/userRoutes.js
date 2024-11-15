// src/routes/user.routes.js
import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/:userId", UserController.getUserById);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);
router.get("/", UserController.getAllUsers);

export default router;
