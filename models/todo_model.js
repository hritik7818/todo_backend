import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title can not exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;