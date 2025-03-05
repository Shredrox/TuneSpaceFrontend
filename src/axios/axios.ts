import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
