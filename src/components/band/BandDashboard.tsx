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
  CardFooter,
} from "../shadcn/Card";
import { Separator } from "../shadcn/Separator";

const BandDashboard = ({ band }: { band: any }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      renderToast();
    }
  }, [mounted]);

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
            <CardTitle>{band.name}</CardTitle>
            <CardDescription className="flex flex-col gap-2">
              <span className="text-lg">{band.description}</span>
              <span className="text-lg">{band.genre}</span>
              <span className="text-lg">
                {band.country}, {band.city}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4"></CardContent>
        <CardFooter>
          <p>Links</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BandDashboard;
