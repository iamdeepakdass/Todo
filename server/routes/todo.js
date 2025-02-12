import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { logout } from "../controllers/user.js";

const router = express.Router();
router.route("/").post(isAuthenticated, createTodo);
router.route("/").get(getAllTodos);
router.route("/:todoId").put(isAuthenticated, updateTodo);
router.route("/:todoId").delete(isAuthenticated, deleteTodo);
router.route("/logout").get(logout);

export default router;
