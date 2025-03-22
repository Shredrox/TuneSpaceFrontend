import { getBand } from "@/services/bandService";
import { getSpotifyArtist } from "@/services/spotifyService";
import { useQuery } from "@tanstack/react-query";

const useBandData = (userId: string) => {
  const {
    data: band,
    isLoading: isBandDataLoading,
    isError: isBandDataError,
    error: bandDataError,
  } = useQuery({
    queryKey: ["band", userId],
    queryFn: () => getBand(userId),
  });

  const {
    data: spotifyProfile,
    isLoading: isSpotifyProfileLoading,
    isError: isSpotifyProfileError,
    error: spotifyProfileError,
  } = useQuery({
    queryKey: ["bandSpotify"],
    queryFn: () => getSpotifyArtist(band.spotifyId),
    enabled: !!band && band.spotifyId !== "",
  });

  const isBandLoading = isBandDataLoading || isSpotifyProfileLoading;
  const isBandError = isBandDataError || isSpotifyProfileError;
  const bandError = bandDataError || spotifyProfileError;

  return {
    bandData: { band, spotifyProfile },
    isBandLoading,
    isBandError,
    bandError,
  };
};

export default useBandData;
