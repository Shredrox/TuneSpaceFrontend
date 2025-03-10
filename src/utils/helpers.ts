export const extractArtistIdFromSpotifyLink = (url: string) => {
  const regex = /\/artist\/([a-zA-Z0-9]+)/;
  const match = url!.match(regex);
  return match ? match[1] : null;
};

export const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /(?:youtube\.com\/(?:.*v=|.*\/|.*embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
