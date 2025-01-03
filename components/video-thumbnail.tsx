'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { YouTubeVideo } from "@/types/youtube"
import Image from 'next/image'

interface VideoThumbnailProps {
  video: YouTubeVideo
}

export function VideoThumbnail({ video }: VideoThumbnailProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isHovering) {
      setIsIframeLoaded(true)
    }
  }, [isHovering])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsExpanded(true)
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setIsIframeLoaded(false)
        }}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Thumbnail Image */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isIframeLoaded && isHovering ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* YouTube iFrame - Only loaded on hover */}
        {isIframeLoaded && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playlist=${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          ></iframe>
        )}
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

