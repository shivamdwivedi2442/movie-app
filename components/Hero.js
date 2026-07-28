"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Movie } from "@/lib/types";
import { IMG } from "@/lib/tmdb";

export default function Hero({ movie }) {
  const backdrop = IMG.backdrop(movie.backdrop_path);

  return (
    <section className="relative overflow-hidden border-b border-stage-700/60">
      <div className="absolute inset-0">
        {backdrop ? (
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : (
          <div className="h-full w-full bg-marquee-glow bg-stage-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stage-950 via-stage-950/70 to-stage-950/30" />
        <div className="absolute inset-0 bg-marquee-glow" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-velvet-500/40 bg-velvet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-velvet-400"
        >
          <Star className="h-3 w-3 fill-velvet-400 text-velvet-400" aria-hidden />
          Trending this week
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-balance font-display text-5xl leading-[0.95] tracking-wide text-mist-100 sm:text-7xl"
        >
          {movie.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl text-balance text-mist-300 line-clamp-3"
        >
          {movie.overview}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-velvet-500 px-6 py-3 text-sm font-semibold text-white shadow-marquee transition-transform hover:scale-[1.03] hover:bg-velvet-400 active:scale-95"
          >
            <Play className="h-4 w-4 fill-white" aria-hidden />
            View details
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-brass-400">
            <Star className="h-4 w-4 fill-brass-400" aria-hidden />
            <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-mist-500">/ 10</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}