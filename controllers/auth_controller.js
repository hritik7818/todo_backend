import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/app_error.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registor = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError("User already exists", 400);
  const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError("Invalid credentials", 401);
  }

  res.status(200).json({
    success: true,
    message: "Login successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

