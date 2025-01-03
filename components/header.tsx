'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GenreFilter } from "@/components/genre-filter"
import { Badge } from './ui/badge'

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedGenre: string
  onGenreSelect: (genre: string) => void
}

export function Header({ searchQuery, setSearchQuery, selectedGenre, onGenreSelect }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <Input
            type="search"
            placeholder="Search movies..."
            className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 h-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
        <h1 className="text-white text-2xl font-semibold font-mono">Moviee Dobieee</h1>
        </div>
      </div>
      <GenreFilter selectedGenre={selectedGenre} onGenreSelect={onGenreSelect} />
    </header>
  )
}

