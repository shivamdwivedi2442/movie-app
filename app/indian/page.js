import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";
import { getIndianMovies } from "@/lib/tmdb";

export const metadata = {
  title: "Indian Cinema",
  description:
    "Popular Indian movies — Bollywood, Tollywood, Kollywood and more, ranked by popularity.",
  alternates: { canonical: "/indian" },
};

export default async function IndianMoviesPage() {
  const data = await getIndianMovies();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="From home"
        title="Indian cinema"
        description="Popular titles from across India's film industries."
      />
      <MovieGrid movies={data.results} />
    </div>
  );
}