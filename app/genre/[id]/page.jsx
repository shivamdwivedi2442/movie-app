import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";
import GenreList from "@/components/GenreList";
import { getGenres, getMoviesByGenre } from "@/lib/tmdb";

export async function generateStaticParams() {
  const genres = await getGenres();
  return genres.map((g) => ({ id: String(g.id) }));
}

export async function generateMetadata({ params }) {
  const genres = await getGenres();
  const genre = genres.find((g) => String(g.id) === params.id);
  if (!genre) return {};
  return {
    title: `${genre.name} Movies`,
    description: `Browse the best ${genre.name.toLowerCase()} movies — trending titles, ratings, and full details.`,
    alternates: { canonical: `/genre/${genre.id}` },
  };
}

export default async function GenrePage({ params }) {
  const genreId = Number(params.id);
  if (Number.isNaN(genreId)) notFound();

  const [genres, movies] = await Promise.all([
    getGenres(),
    getMoviesByGenre(genreId),
  ]);
  const genre = genres.find((g) => g.id === genreId);
  if (!genre) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Genre" title={`${genre.name} movies`} />
      <div className="mb-8">
        <GenreList genres={genres} activeId={genreId} />
      </div>
      <MovieGrid
        movies={movies.results}
        emptyMessage={`No ${genre.name.toLowerCase()} titles found right now.`}
      />
    </div>
  );
}