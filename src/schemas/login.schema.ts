import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1, "Password is required"),
});
