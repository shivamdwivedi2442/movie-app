import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";
import { FilmIcon } from "lucide-react";

export default function MovieGrid({
  movies,
  emptyMessage = "No titles found. Try another search.",
}) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stage-700 py-20 text-center">
        <FilmIcon className="mb-3 h-8 w-8 text-mist-500" aria-hidden />
        <p className="text-mist-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={i} priority={i < 4} />
      ))}
    </div>
  );
}