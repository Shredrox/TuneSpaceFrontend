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
import { SiTidal } from "react-icons/si";
import YouTubeEmbedDialog from "./YouTubeEmbedDialog";

const BandDashboard = ({ band }: { band: any }) => {
  const [embededYouTubeVideo, setEmbededYouTubeVideo] = useState<string | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

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
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-5xl font-medium">Dashboard</h1>
      <Card className="w-[900px]">
        <CardHeader className="flex flex-row justify-left items-center h-[300px] gap-4">
          <Avatar className="w-[200px] h-[200px]">
            <AvatarImage src={`data:image/jpeg;base64,${band.coverImage}`} />
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
                  {band.name}
                </span>
                <span className="text-lg">{band.description}</span>
                <span className="text-lg">{band.genre}</span>
                <span className="text-lg">
                  {band.country}, {band.city}
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
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            <Card className="p-4 flex flex-col items-center justify-center gap-4">
              <FaYoutube className="text-[#FF0000]" size={50} />
              <YouTubeEmbedDialog
                setEmbededYouTubeVideo={setEmbededYouTubeVideo}
              />
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-4">
              <FaSpotify className="text-[#1DB954]" size={50} />
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-4">
              <FaApple size={50} />
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-4">
              <SiTidal size={50} />
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BandDashboard;
