'use client'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { MovieCard } from "@/components/movie-card"
import { Header } from "@/components/header"
import { fetchMovies, fetchMoviesByCategory } from './actions'
import { YouTubeVideo } from "@/types/youtube"
import { useDebounce } from '@/hooks/use-debounce'
import { VideoPlayer } from '@/components/video-player'
import { useLocalStorage } from '@/hooks/use-local-storage'

export default function Home() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [trendingVideos, setTrendingVideos] = useState<YouTubeVideo[]>([])
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [savedVideos, setSavedVideos] = useLocalStorage<string[]>('savedVideos', [])
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const loadInitialVideos = async () => {
      try {
        const [newVideos, trending] = await Promise.all([
          fetchMovies(),
          fetchMovies('trending'),
        ]);
        setVideos(newVideos.items);
        setTrendingVideos(trending.items);
      } catch (error) {
        console.error('Error loading initial videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialVideos();
  }, []);

  useEffect(() => {
    const searchVideos = async () => {
      if (!debouncedSearch) return;
      setIsLoading(true);
      try {
        const results = await fetchMovies(debouncedSearch);
        setVideos(results.items);
      } catch (error) {
        console.error('Error searching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchVideos();
  }, [debouncedSearch]);

  const handleGenreSelect = async (genre: string) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    try {
      const results = await fetchMoviesByCategory(genre === 'All' ? '' : genre);
      setVideos(results.items);
    } catch (error) {
      console.error('Error fetching genre videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVideo = (videoId: string) => {
    if (!savedVideos.includes(videoId)) {
      setSavedVideos([...savedVideos, videoId])
    }
  }

  const featuredVideo = videos[0];

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreSelect={handleGenreSelect}
      />

      <div className="p-4 md:p-6 space-y-8">
        {featuredVideo && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden aspect-[21/9] mb-8"
            >
              <VideoPlayer videoId={featuredVideo.id.videoId} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                  {featuredVideo.snippet.title}
                </h1>
                <p className="text-white/80 max-w-lg mb-4 md:mb-6 text-sm md:text-base line-clamp-2 md:line-clamp-3">
                  {featuredVideo.snippet.description}
                </p>
              </div>
            </motion.div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            {searchQuery ? 'Search Results' : selectedGenre === 'All' ? 'New Releases' : `${selectedGenre} Movies`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="aspect-video animate-pulse bg-zinc-800/50 rounded-lg" />
              ))
            ) : (
              videos.map((video, i) => (
                <MovieCard key={video.id.videoId} video={video} delay={i * 0.1} onSave={handleSaveVideo} />
              ))
            )}
          </div>
        </section>

        {!searchQuery && selectedGenre === 'All' && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-video animate-pulse bg-zinc-800/50 rounded-lg" />
                ))
              ) : (
                trendingVideos.map((video, i) => (
                  <MovieCard key={video.id.videoId} video={video} delay={i * 0.1} onSave={handleSaveVideo} />
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

