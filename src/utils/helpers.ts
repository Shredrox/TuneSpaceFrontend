export const extractArtistIdFromSpotifyLink = (url: string) => {
  const regex = /\/artist\/([a-zA-Z0-9]+)/;
  const match = url!.match(regex);
  return match ? match[1] : null;
};
