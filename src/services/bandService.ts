import axios from "@/axios/axios";
import { ENDPOINTS } from "@/utils/constants";

export const getBand = async (userId: string) => {
  return (await axios.get(`${ENDPOINTS.BAND}/user/${userId}`)).data;
};
