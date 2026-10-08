import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "title must be 1 character length")
    .max(100, "title can only be 100 charactor long"),
  description: z
    .string()
    .min(1,"description must be 1 character length")
    .max(1000, "description can only be 1000 charactor long")
    .optional(),
});

export const updateTodoSchema = z
  .object({
    title: z.string().max(100).optional(),
    description: z.string().max(1000).optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Provider at least one field",
  );
