"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../shadcn/Card";
import { Separator } from "../shadcn/Separator";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiTidal, SiApplemusic } from "react-icons/si";
import YouTubeEmbedDialog from "./YouTubeEmbedDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../shadcn/Carousel";
import useAuth from "@/hooks/useAuth";
import axios from "@/axios/axios";
import { ENDPOINTS, SPOTIFY_ENDPOINTS } from "@/utils/constants";
import Band from "@/interfaces/Band";

const BandDashboard = () => {
  const { auth } = useAuth();
  const [band, setBand] = useState<any>(null);
  const [spotifyStats, setSpotifyStats] = useState<any>(null);

  const [embededYouTubeVideo, setEmbededYouTubeVideo] = useState<string | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getBand = async () => {
      const band = (await axios.get(`${ENDPOINTS.BAND}/user/${auth?.id}`)).data;
      setBand(band);
    };

    if (auth.id) {
      getBand();
    }
  }, [auth]);

  useEffect(() => {
    const aa = async () => {
      const response = await axios.get(
        `${SPOTIFY_ENDPOINTS.ARTIST}/6d24kC5fxHFOSEAmjQPPhc?si=pUj7xxatS5iejgqyXO0eow`
      );
      console.log(response.data);
      setSpotifyStats(response.data);
    };

    aa();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      renderToast();
    }
  }, [mounted]);

  useEffect(() => {
    if (embededYouTubeVideo) {
      toast("YouTube video successfully embedded!", {
        duration: 5000,
        cancel: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
    }
  }, [embededYouTubeVideo]);

  const renderToast = () => {
    toast(
      "Welcome to the Band Dashboard! Here you can manage your band activities as well as add additional info for your band.",
      {
        duration: 10000,
        style: { height: "100px" },
        cancel: {
          label: "Dismiss",
          onClick: () => {},
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <h1 className="text-4xl font-medium ml-4">Dashboard</h1>
      <Card className="w-full p-4 flex flex-col gap-4">
        <CardHeader className="flex flex-row justify-left items-center h-[300px] gap-4">
          <Avatar className="w-[200px] h-[200px]">
            <AvatarImage src={`data:image/jpeg;base64,${band?.coverImage}`} />
            <AvatarFallback>BandPicture</AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" />
          <div className="h-full flex flex-col gap-4 justify-left">
            <CardTitle></CardTitle>
            <CardDescription className="flex gap-6 items-start justify-center">
              <div className="flex flex-col gap-2">
                <span
                  className="text-2xl
                  font-semibold
                  leading-none
                  tracking-tight text-white"
                >
                  {band?.name}
                </span>
                <span className="text-lg">{band?.description}</span>
                <span className="text-lg">{band?.genre}</span>
                <span className="text-lg">
                  {band?.country}, {band?.city}
                </span>
              </div>
              {embededYouTubeVideo && (
                <iframe
                  className="w-[420px] aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${embededYouTubeVideo}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <Carousel className="ml-11 w-full max-w-sm">
                <CarouselContent className="-ml-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 flex flex-col">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            Image
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <Card className="p-2 flex-1 flex flex-col items-center justify-center gap-2">
              <FaYoutube className="text-[#FF0000]" size={50} />
              <YouTubeEmbedDialog
                setEmbededYouTubeVideo={setEmbededYouTubeVideo}
              />
            </Card>
            <Card className="p-2 flex-1 flex flex-col items-center justify-center">
              <CardHeader className="w-full flex justify-left items-center gap-4">
                <div className="flex gap-4 items-center justify-center w-full">
                  {" "}
                  <FaSpotify className="text-[#1DB954]" size={50} />
                  <h3>Spotify Stats</h3>
                </div>
                <Avatar className="w-[200px] h-[200px]">
                  <AvatarImage src={spotifyStats?.images[0].url} />
                  <AvatarFallback>BandPicture</AvatarFallback>
                </Avatar>
                <span>Followers: {spotifyStats?.followers.total}</span>
                <span>Popularity: {spotifyStats?.popularity}</span>
              </CardHeader>
            </Card>
            <Card className="p-2 flex-1 flex flex-col items-center justify-center">
              <CardHeader className="w-full flex justify-left items-center gap-4">
                <SiApplemusic size={50} /> <h3>Apple Music Stats</h3>
              </CardHeader>
            </Card>
            <Card className="p-2 flex-1 flex flex-col items-center justify-center">
              <CardHeader className="w-full flex justify-left items-center gap-4">
                <SiTidal size={50} /> <h3>Tidal Stats</h3>
              </CardHeader>
            </Card>
          </div>
          <Carousel></Carousel>
        </CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Band Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {band?.members?.map((member: any, index: number) => (
                <Card key={index} className="flex flex-row items-center gap-4">
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage
                      src={`data:image/jpeg;base64,${member.picture}`}
                    />
                    <AvatarFallback>BandMember</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">{member.name}</span>
                    <span className="text-lg">{member.role}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Concerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {band?.members?.map((member: any, index: number) => (
                <Card key={index} className="flex flex-row items-center gap-4">
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage
                      src={`data:image/jpeg;base64,${member.picture}`}
                    />
                    <AvatarFallback>BandMember</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">{member.name}</span>
                    <span className="text-lg">{member.role}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Merchandise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {band?.members?.map((member: any, index: number) => (
                <Card key={index} className="flex flex-row items-center gap-4">
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage
                      src={`data:image/jpeg;base64,${member.picture}`}
                    />
                    <AvatarFallback>BandMember</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">{member.name}</span>
                    <span className="text-lg">{member.role}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default BandDashboard;
