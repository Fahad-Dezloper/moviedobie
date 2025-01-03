import { Youtube, Home, Compass, Flame, Clock, Star } from 'lucide-react'
import Link from "next/link"

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50 py-3 md:hidden">
      <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
        <Youtube size={24} />
      </Link>
      <Link href="/" className="text-white/60 hover:text-white transition-colors">
        <Home size={24} />
      </Link>
      <Link href="/explore" className="text-white/60 hover:text-white transition-colors">
        <Compass size={24} />
      </Link>
      <Link href="/shorts" className="text-white/60 hover:text-white transition-colors">
        <Flame size={24} />
      </Link>
      <Link href="/watch-later" className="text-white/60 hover:text-white transition-colors">
        <Clock size={24} />
      </Link>
      <Link href="/favorites" className="text-white/60 hover:text-white transition-colors">
        <Star size={24} />
      </Link>
    </div>
  )
}

