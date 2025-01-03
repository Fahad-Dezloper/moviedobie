'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { fetchVideoDetails } from '../actions'
import { MovieCard } from '@/components/movie-card'
import { YouTubeVideo } from '@/types/youtube'

export default function SavedPage() {
  const [savedVideos] = useLocalStorage<string[]>('savedVideos', [])
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSavedVideos = async () => {
      setIsLoading(true)
      try {
        const videoDetails = await Promise.all(savedVideos.map(id => fetchVideoDetails(id)))
        setVideos(videoDetails)
      } catch (error) {
        console.error('Error loading saved videos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedVideos()
  }, [savedVideos])

  const handleSaveVideo = (videoId: string) => {
    // This function is not needed for the Saved page, but we need to pass it to MovieCard
    console.log('Video already saved:', videoId)
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white mb-4">Saved Videos</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-video animate-pulse bg-white/10 rounded-xl" />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {videos.map((video, i) => (
            <MovieCard key={video.id.videoId} video={video} delay={i * 0.1} onSave={handleSaveVideo} />
          ))}
        </div>
      ) : (
        <p className="text-white/70">Your saved videos list is empty. Start adding videos to watch them later!</p>
      )}
    </div>
  )
}

