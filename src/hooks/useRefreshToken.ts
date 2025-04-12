import httpClient from "@/services/http-client";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await httpClient.post(
      "Auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    setAuth((prev) => {
      return {
        ...prev,
        username: response.data.username,
        accessToken: response.data.newAccessToken,
        role: response.data.role,
      };
    });
    return response.data.newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
