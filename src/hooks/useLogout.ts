import axios from "@/axios/axios";
import useAuth from "./useAuth";
import { ENDPOINTS } from "@/utils/constants";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await axios.post(`${ENDPOINTS.LOGOUT}`, {});
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
