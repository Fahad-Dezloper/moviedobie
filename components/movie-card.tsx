/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { YouTubeVideo } from "@/types/youtube";
import { VideoThumbnail } from "./video-thumbnail";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VideoPlayer } from "./video-player";

interface MovieCardProps {
  video: YouTubeVideo;
  delay?: number;
  onSave?: (videoId: string) => void;
}

export function MovieCard({ video, delay = 0, onSave }: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (videoId: string) => {
    if (onSave) {
      onSave(videoId);
    } else {
      console.log("Save functionality not implemented.");
    }
  };

  const handleShare = (videoId: string) => {
    console.log("Sharing video:", videoId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <VideoThumbnail video={video} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <VideoPlayer videoId={video.id.videoId} />
      </DialogContent>
    </Dialog>
  );
}
