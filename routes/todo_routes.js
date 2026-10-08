import express from "express";
import protect from "../middlewares/auth_middleware.js"

import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo_controller.js";
import { validate } from "../utils/validate.js";
import { createTodoSchema, updateTodoSchema } from "../validations/todo_schema.js";

const router = express.Router();
router.use(protect);


router
  .route("/")
  .get(getTodos) // GET /api/todos
  .post(validate(createTodoSchema),createTodo,); // POST /api/todos

router
  .route("/:id")
  .get(getTodo) // GET /api/todos/:id
  .put(validate(updateTodoSchema),updateTodo,) // PUT /api/todos/:id
  .delete(deleteTodo); // DELETE /api/todos/:id

export default router;
