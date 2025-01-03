"use client"
import { useState } from 'react'
import { YouTubeVideo } from "@/types/youtube"
import { VideoThumbnail } from './video-thumbnail'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { VideoPlayer } from './video-player'

interface MovieCardProps {
  video: YouTubeVideo;
  delay?: number;
  onSave: (videoId: string) => void;
}
// @ts-ignore
export function MovieCard({ video, delay = 0, onSave }: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = (videoId: string) => {
    onSave(videoId)
  }

  const handleShare = (videoId: string) => {
    // Implement share functionality
    console.log('Sharing video:', videoId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
        {/* @ts-ignore */}
          <VideoThumbnail video={video} onSave={handleSave} onShare={handleShare} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <VideoPlayer videoId={video.id.videoId} />
      </DialogContent>
    </Dialog>
  )
}

