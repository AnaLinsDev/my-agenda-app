import { z } from "zod";

export const schema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  category: z.string().min(1, "Category is required"),
  filter: z.enum(["today", "week", "weekend"]),
});

export type FormDataModalAdd = z.infer<typeof schema>;