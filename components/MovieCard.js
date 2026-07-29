"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { IMG } from "@/lib/tmdb";

export default function MovieCard({ movie, priority = false, index = 0 }) {
  const poster = IMG.poster(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const isTV = movie.media_type === "tv";
  const href = isTV ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="group block outline-none" aria-label={`${movie.title}, ${year}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-stage-700/60 bg-stage-800 shadow-card transition-shadow duration-300 group-hover:shadow-marquee group-focus-visible:shadow-marquee">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-stage-800 px-4 text-center">
              <span className="font-display text-lg tracking-wide text-mist-500">
                {movie.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stage-950/90 via-stage-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="line-clamp-2 text-xs text-mist-300">{movie.overview}</p>
          </div>
          {isTV && (
            <div className="absolute left-2 top-2 rounded-full bg-stage-950/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-velvet-400 backdrop-blur-sm">
              Series
            </div>
          )}
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-stage-950/80 px-2 py-1 text-xs font-semibold text-brass-400 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-brass-400 text-brass-400" aria-hidden />
            {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
          </div>
        </div>
        <div className="mt-2 px-0.5">
          <h3 className="truncate text-sm font-semibold text-mist-100 group-hover:text-brass-400">
            {movie.title}
          </h3>
          <p className="text-xs text-mist-500">{year}</p>
        </div>
      </Link>
    </motion.div>
  );
}