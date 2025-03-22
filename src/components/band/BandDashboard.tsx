"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../shadcn/Card";
import { Separator } from "../shadcn/Separator";
import { FaSpotify, FaYoutube } from "react-icons/fa";
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
import Band from "@/interfaces/Band";
import useBandData from "@/hooks/query/useBandData";
import Loading from "../fallback/Loading";
import useToast from "@/hooks/useToast";

const BandDashboard = () => {
  const { auth } = useAuth();

  const [embededYouTubeVideo, setEmbededYouTubeVideo] = useState<string | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  const { bandData, isBandLoading, isBandError, bandError } = useBandData(
    auth?.id || ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      useToast(
        "Welcome to the Band Dashboard! Here you can manage your band activities as well as add additional info for your band."
      );
    }
  }, [mounted]);

  useEffect(() => {
    if (embededYouTubeVideo) {
      useToast("YouTube video successfully embedded!", 5000);
    }
  }, [embededYouTubeVideo]);

  if (isBandLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <h1 className="text-4xl font-medium ml-4">Dashboard</h1>
      <Card className="w-full p-4 flex flex-col gap-4">
        <CardHeader className="flex flex-row justify-left items-center h-[300px] gap-4">
          <Avatar className="w-[200px] h-[200px]">
            <AvatarImage
              src={`data:image/jpeg;base64,${bandData.band?.coverImage}`}
            />
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
                  {bandData.band?.name}
                </span>
                <span className="text-lg">{bandData.band?.description}</span>
                <span className="text-lg">{bandData.band?.genre}</span>
                <span className="text-lg">
                  {bandData.band?.country}, {bandData.band?.city}
                </span>
              </div>
              {embededYouTubeVideo ? (
                <iframe
                  className="w-[420px] aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${embededYouTubeVideo}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Card className="p-2 flex-1 flex flex-col items-center justify-center gap-2">
                  <FaYoutube className="text-[#FF0000]" size={50} />
                  <YouTubeEmbedDialog
                    setEmbededYouTubeVideo={setEmbededYouTubeVideo}
                  />
                </Card>
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
            <Card className="p-2 flex-1 flex flex-col items-center justify-center">
              <CardHeader className="w-full flex justify-left items-center gap-4">
                <div className="flex gap-4 items-center justify-center w-full">
                  {" "}
                  <FaSpotify className="text-[#1DB954]" size={50} />
                  <h3>Spotify Stats</h3>
                </div>
                <Avatar className="w-[200px] h-[200px]">
                  <AvatarImage src={bandData.spotifyProfile?.images[0].url} />
                  <AvatarFallback>BandPicture</AvatarFallback>
                </Avatar>
                <span>
                  Followers: {bandData.spotifyProfile?.followers.total}
                </span>
                <span>Popularity: {bandData.spotifyProfile?.popularity}</span>
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
              {bandData.band?.members?.map((member: any, index: number) => (
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
              {bandData.band?.members?.map((member: any, index: number) => (
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
              {bandData.band?.members?.map((member: any, index: number) => (
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
