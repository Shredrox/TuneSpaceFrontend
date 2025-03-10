"use server";

import axios from "@/axios/axios";
import { ENDPOINTS } from "@/utils/constants";

export const registerBand = async (data: { [key: string]: any }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await axios.post(`${ENDPOINTS.BANDREGISTER}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
