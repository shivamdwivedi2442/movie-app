import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stage-700/60 bg-stage-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2 font-display text-xl tracking-wide text-mist-200">
            <Clapperboard className="h-5 w-5 text-velvet-500" aria-hidden />CINE
            <span className="text-velvet-500">HUB</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-400">
            <Link href="/" className="hover:text-mist-100">Now Trending</Link>
            <Link href="/top-rated" className="hover:text-mist-100">Top Rated</Link>
            <Link href="/upcoming" className="hover:text-mist-100">Upcoming</Link>
            <Link href="/genres" className="hover:text-mist-100">Genres</Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-mist-500">
          Movie data via The Movie Database (TMDB). Cine Hub is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
}