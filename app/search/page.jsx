import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import { searchMovies } from "@/lib/tmdb";

export function generateMetadata({ searchParams }) {
  const q = searchParams.q?.trim();
  return {
    title: q ? `Results for "${q}"` : "Search Movies",
    description: q
      ? `Search results for "${q}" — browse matching movie titles, ratings, and details.`
      : "Search the full movie catalog by title.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }) {
  const q = searchParams.q?.trim() ?? "";
  const results = q ? await searchMovies(q) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Search" title={q ? `Results for "${q}"` : "Search movies"} />
      <div className="mb-10 max-w-md">
        <SearchBar />
      </div>
      {results ? (
        <MovieGrid
          movies={results.results}
          emptyMessage={`No titles matched "${q}". Try a different spelling.`}
        />
      ) : (
        <p className="text-mist-400">Start typing to search the catalog.</p>
      )}
    </div>
  );
}