import axios from "@/axios/axios";
import Band from "@/interfaces/Band";
import { ENDPOINTS } from "@/utils/constants";

export const getBand = async (userId: string): Promise<Band> => {
  return (await axios.get(`${ENDPOINTS.BAND}/user/${userId}`)).data;
};

export const updateBand = async (updateData: { [key: string]: any }) => {
  await axios.put(`${ENDPOINTS.BANDUPDATE}`, updateData);
};
