export const BASE_URL = "http://localhost:5053/api";

export const ROUTES = {
  HOME: "/",
} as const;

export const ENDPOINTS = {
  LOGIN: "/Auth/login",
} as const;

export const SPOTIFY_ENDPOINTS = {
  LOGIN: "/Spotify/login",
  SEARCH: "/Spotify/search",
  PROFILE: "/Spotify/profile",
} as const;
