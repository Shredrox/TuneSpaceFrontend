import SearchSong from "@/interfaces/spotify/SearchSong";
import axios from "../axios/axios";
import SpotifyProfile from "../interfaces/spotify/SpotifyProfile";
import { SPOTIFY_ENDPOINTS } from "@/utils/constants";
import SpotifyArtist from "@/interfaces/spotify/SpotifyArtist";

export const getSpotifyProfile = async (): Promise<SpotifyProfile> => {
  const response = await axios.get(SPOTIFY_ENDPOINTS.PROFILE);
  return response.data;
};

export const getSpotifySongsBySearch = async (
  search: string
): Promise<SearchSong[]> => {
  const response = await axios.get(`${SPOTIFY_ENDPOINTS.SEARCH}/${search}`);
  return response.data;
};

export const getSpotifyArtist = async (
  artistId: string | undefined
): Promise<SpotifyArtist> => {
  return (await axios.get(`${SPOTIFY_ENDPOINTS.ARTIST}/${artistId}`)).data;
};
