import UserSearchResult from "@/interfaces/user/UserSearchResult";
import UserProfile from "../interfaces/UserProfile";
import axios from "@/axios/axios";

interface FollowData {
  loggedInUser: string;
  profileUser: string;
}

export const getUserProfile = async (
  username: string
): Promise<UserProfile> => {
  const response = await axios.get(`/User/${username}/profile`);
  return response.data;
};

export const getUserByName = async (username: string) => {
  const response = await axios.get(`User/${username}`);
  return response.data;
};

export const getUsersByNameSearch = async (
  username: string
): Promise<UserSearchResult[]> => {
  const response = await axios.get(`/User/${username}`);
  return response.data;
};

export const checkFollowing = async (
  followerUsername?: string,
  followedUsername?: string
): Promise<boolean> => {
  const response = await axios.get("/Follow/check-following", {
    params: {
      followerUsername,
      followedUsername,
    },
  });

  return response.data;
};

export const followUser = async ({ loggedInUser, profileUser }: FollowData) => {
  const response = await axios.post(`/Follow/create`, {
    loggedInUser,
    profileUser,
  });

  return response.data;
};

export const unfollowUser = async ({
  loggedInUser,
  profileUser,
}: FollowData) => {
  const response = await axios.post(`/Follow/delete`, {
    loggedInUser,
    profileUser,
  });

  return response.data;
};
