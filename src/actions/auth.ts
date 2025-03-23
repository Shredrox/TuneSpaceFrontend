"use server";

import axios from "@/axios/axios";
import { registerSchema } from "@/schemas/register.schema";
import { ENDPOINTS } from "@/utils/constants";

export const registerUser = async (data: FormData) => {
  const formData = Object.fromEntries(data);
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  await axios.post(`${ENDPOINTS.REGISTER}`, JSON.stringify(parsed.data), {
    headers: { "Content-Type": "application/json" },
  });
};
