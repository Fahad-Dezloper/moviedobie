import { fetchMovies } from '../actions'
import { MovieCard } from '@/components/movie-card'

export default async function ExplorePage() {
  const videos = await fetchMovies('explore')

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white mb-4">Explore</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {videos.items.map((video, i) => (
          <MovieCard key={video.id.videoId} video={video} delay={i * 0.1} />
        ))}
      </div>
    </div>
  )
}

