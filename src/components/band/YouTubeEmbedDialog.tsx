"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/Dialog";
import { Button } from "@/components/shadcn/Button";
import { Input } from "@/components/shadcn/Input";
import { Dispatch, useEffect, useState } from "react";
import { getYouTubeVideoId } from "@/utils/helpers";

interface YouTubeEmbedDialogProps {
  setEmbeddedYouTubeVideo: Dispatch<React.SetStateAction<string | null>>;
}

const YouTubeEmbedDialog = ({
  setEmbeddedYouTubeVideo,
}: YouTubeEmbedDialogProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleEmbed = () => {
    const id = getYouTubeVideoId(videoUrl);
    setVideoId(id);
  };

  useEffect(() => {
    if (videoUrl) {
      handleEmbed();
    } else {
      setVideoId(null);
    }
  }, [videoUrl]);

  return (
    <Dialog onOpenChange={() => setVideoUrl("")}>
      <DialogTrigger asChild>
        <Button variant="outline">Embed YouTube Video</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Embed YouTube Video</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            placeholder="Enter YouTube URL..."
            value={videoUrl}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md rounded"
          />
          {videoId && (
            <div className="mt-4">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => setEmbeddedYouTubeVideo(videoId)}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubeEmbedDialog;
