import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, PlayCircle, Star } from "lucide-react";
import { getMovieDetail, getTrending, IMG } from "@/lib/tmdb";
import GenreList from "@/components/GenreList";
import CastStrip from "@/components/CastStrip";
import HistoryTracker from "@/components/HistoryTracker";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  const trending = await getTrending();
  return trending.results.slice(0, 8).map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return {};
  const movie = await getMovieDetail(id);
  if (!movie) return {};

  const poster = IMG.poster(movie.poster_path, "w780");
  const year = movie.release_date?.slice(0, 4);

  return {
    title: `${movie.title}${year ? ` (${year})` : ""}`,
    description:
      movie.overview?.slice(0, 155) ||
      `Details, cast, and ratings for ${movie.title}.`,
    alternates: { canonical: `/movie/${movie.id}` },
    openGraph: {
      type: "video.movie",
      title: movie.title,
      description: movie.overview,
      images: poster ? [{ url: poster, width: 780, height: 1170, alt: `${movie.title} poster` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.overview,
      images: poster ? [poster] : [],
    },
  };
}

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default async function MovieDetailPage({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const movie = await getMovieDetail(id);
  if (!movie) notFound();

  const poster = IMG.poster(movie.poster_path, "w780");
  const backdrop = IMG.backdrop(movie.backdrop_path);
  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const year = movie.release_date?.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    image: poster || undefined,
    description: movie.overview,
    datePublished: movie.release_date || undefined,
    duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
    genre: movie.genres?.map((g) => g.name),
    aggregateRating: movie.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average,
          bestRating: "10",
          ratingCount: movie.vote_count || 1,
        }
      : undefined,
  };

  return (
    <div>
      <HistoryTracker movie={movie} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-stage-700/60">
        <div className="absolute inset-0">
          {backdrop && (
            <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stage-950 via-stage-950/80 to-stage-950/40" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 md:grid-cols-[260px_1fr] lg:px-8">
          <div className="mx-auto w-48 flex-shrink-0 md:w-full">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-stage-700 shadow-card">
              {poster ? (
                <Image src={poster} alt={`${movie.title} poster`} fill sizes="260px" className="object-cover" priority />
              ) : (
                <div className="flex h-full items-center justify-center bg-stage-800 px-3 text-center font-display text-lg text-mist-500">
                  {movie.title}
                </div>
              )}
            </div>
          </div>

          <div>
            {movie.tagline && (
              <p className="mb-2 text-sm italic text-brass-400">&ldquo;{movie.tagline}&rdquo;</p>
            )}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-balance font-display text-4xl tracking-wide text-mist-100 sm:text-5xl">
                {movie.title} {year && <span className="text-mist-500">({year})</span>}
              </h1>
              <FavoriteButton movie={movie} size="lg" className="border border-stage-600" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-mist-300">
              <span className="flex items-center gap-1.5 text-brass-400">
                <Star className="h-4 w-4 fill-brass-400" aria-hidden />
                <strong>{movie.vote_average?.toFixed(1)}</strong>
                <span className="text-mist-500">({movie.vote_count?.toLocaleString()} votes)</span>
              </span>
              {movie.runtime ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {formatRuntime(movie.runtime)}
                </span>
              ) : null}
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-velvet-400 hover:text-velvet-300"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  Watch trailer
                </a>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-6">
                <GenreList genres={movie.genres} />
              </div>
            )}

            <p className="mt-6 max-w-2xl text-mist-300">{movie.overview}</p>
          </div>
        </div>
      </section>

      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-2xl tracking-wide text-mist-100">Cast</h2>
          <CastStrip cast={movie.credits.cast} />
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-medium text-mist-400 hover:text-brass-400">
          ← Back to browsing
        </Link>
      </div>
    </div>
  );
}