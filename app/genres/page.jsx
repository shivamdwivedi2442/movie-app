import { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getGenres } from "@/lib/tmdb";
import { Clapperboard } from "lucide-react";

export const metadata = {
  title: "Browse by Genre",
  description:
    "Explore movies by genre — action, drama, comedy, horror, sci-fi and more, all in one place.",
  alternates: { canonical: "/genres" },
};

export default async function GenresPage() {
  const genres = await getGenres();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Explore" title="Browse by genre" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="group flex items-center gap-3 rounded-xl border border-stage-700/60 bg-stage-800 p-5 transition-all hover:-translate-y-0.5 hover:border-velvet-500/60 hover:shadow-card"
          >
            <Clapperboard className="h-5 w-5 text-velvet-500 transition-transform group-hover:scale-110" aria-hidden />
            <span className="font-medium text-mist-100">{genre.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}