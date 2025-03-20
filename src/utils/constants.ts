export const BASE_URL = "http://localhost:5053/api";

export const ROUTES = {
  HOME: "/",
} as const;

export const ENDPOINTS = {
  LOGIN: "Auth/login",
  LOGOUT: "Auth/logout",
  REGISTER: "Auth/register",
  BANDREGISTER: "Band/register",
  BAND: "Band",
} as const;

export const SPOTIFY_ENDPOINTS = {
  LOGIN: "Spotify/login",
  SEARCH: "Spotify/search",
  PROFILE: "Spotify/profile",
  ARTIST: "Spotify/artist",
} as const;

export enum UserRole {
  Admin = "Admin",
  BandAdmin = "BandAdmin",
  BandMember = "BandMember",
  Listener = "Listener",
}
