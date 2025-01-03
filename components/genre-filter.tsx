'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const genres = [
  "All",
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
]

interface GenreFilterProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export function GenreFilter({ selectedGenre, onGenreSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
      {genres.map((genre, i) => (
        <motion.button
          key={genre}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            genre === selectedGenre
              ? "bg-red-500 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
          )}
          onClick={() => onGenreSelect(genre)}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  )
}

