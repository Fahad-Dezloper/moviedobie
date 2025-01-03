import { Youtube, Home, Compass, Clock, Film, Flame, Star } from 'lucide-react'
import Link from "next/link"

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 flex-col items-center py-6 gap-8 hidden md:flex">
      <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
        <Youtube size={32} />
      </Link>
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <Home size={24} />
        </Link>
        <Link
          href="/explore"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <Compass size={24} />
        </Link>
        <Link
          href="/shorts"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <Flame size={24} />
        </Link>
        <Link
          href="/watch-later"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <Clock size={24} />
        </Link>
        <Link
          href="/favorites"
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <Star size={24} />
        </Link>
      </nav>
    </div>
  )
}

