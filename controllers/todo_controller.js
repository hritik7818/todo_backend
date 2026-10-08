import Todo from "../models/todo_model.js";
import { ApiError } from "../utils/app_error.js";
import { asyncHandler } from "../utils/async_handler.js";

// create todo
export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({ ...req.body, user: req.user.id });
  res.status(201).json({
    success: true,
    message: "todo successfully created!",
    data: todo,
  });
});

//get todos
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, data: todos });
});

//get todo
export const getTodo = asyncHandler(async (req, res,next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new ApiError("Todo not found", 404);
  res.status(200).json({ success: true, data: todo });
});

// update the todo
export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    {_id: req.params.id,user : req.user.id},
    req.body,
    { new: true, runValidations: true },
  );

  if (!todo) throw new ApiError("Todo not found", 404);

  res.status(200).json({
    success: true,
    data: todo,
    message: "Todo updated successfully!",
  });
});

// delete todo

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOneAndDelete({_id : req.params.id,user:req.user.id});
  if (!todo) throw new ApiError("Todo not found", 404);
  res
    .status(200)
    .json({ success: true, data: todo, message: "Todo delete successfully" });
});
