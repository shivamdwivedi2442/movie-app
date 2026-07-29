import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, PlayCircle, Star, Tv } from "lucide-react";
import { getTVDetail, IMG } from "@/lib/tmdb";
import GenreList from "@/components/GenreList";
import CastStrip from "@/components/CastStrip";
import HistoryTracker from "@/components/HistoryTracker";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateMetadata({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return {};
  const show = await getTVDetail(id);
  if (!show) return {};

  const poster = IMG.poster(show.poster_path, "w780");
  const year = show.release_date?.slice(0, 4);

  return {
    title: `${show.title}${year ? ` (${year})` : ""} — Web Series`,
    description:
      show.overview?.slice(0, 155) || `Details and cast for ${show.title}.`,
    alternates: { canonical: `/tv/${show.id}` },
    openGraph: {
      type: "video.tv_show",
      title: show.title,
      description: show.overview,
      images: poster ? [{ url: poster, width: 780, height: 1170, alt: `${show.title} poster` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: show.title,
      description: show.overview,
      images: poster ? [poster] : [],
    },
  };
}

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m / episode` : `${m}m / episode`;
}

export default async function TVDetailPage({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const show = await getTVDetail(id);
  if (!show) notFound();

  const poster = IMG.poster(show.poster_path, "w780");
  const backdrop = IMG.backdrop(show.backdrop_path);
  const trailer = show.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const year = show.release_date?.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: show.title,
    image: poster || undefined,
    description: show.overview,
    datePublished: show.release_date || undefined,
    genre: show.genres?.map((g) => g.name),
    numberOfSeasons: show.numberOfSeasons || undefined,
    numberOfEpisodes: show.numberOfEpisodes || undefined,
    aggregateRating: show.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: show.vote_average,
          bestRating: "10",
          ratingCount: show.vote_count || 1,
        }
      : undefined,
  };

  return (
    <div>
      <HistoryTracker movie={show} />
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
                <Image src={poster} alt={`${show.title} poster`} fill sizes="260px" className="object-cover" priority />
              ) : (
                <div className="flex h-full items-center justify-center bg-stage-800 px-3 text-center font-display text-lg text-mist-500">
                  {show.title}
                </div>
              )}
            </div>
          </div>

          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-velvet-500/40 bg-velvet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-velvet-400">
              <Tv className="h-3 w-3" aria-hidden />
              Web Series
            </span>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-balance font-display text-4xl tracking-wide text-mist-100 sm:text-5xl">
                {show.title} {year && <span className="text-mist-500">({year})</span>}
              </h1>
              <FavoriteButton movie={show} size="lg" className="border border-stage-600" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-mist-300">
              <span className="flex items-center gap-1.5 text-brass-400">
                <Star className="h-4 w-4 fill-brass-400" aria-hidden />
                <strong>{show.vote_average?.toFixed(1)}</strong>
                <span className="text-mist-500">({show.vote_count?.toLocaleString()} votes)</span>
              </span>
              {show.runtime ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {formatRuntime(show.runtime)}
                </span>
              ) : null}
              {show.numberOfSeasons ? (
                <span>{show.numberOfSeasons} season{show.numberOfSeasons > 1 ? "s" : ""}</span>
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

            {show.genres?.length > 0 && (
              <div className="mt-6">
                <GenreList genres={show.genres} />
              </div>
            )}

            <p className="mt-6 max-w-2xl text-mist-300">{show.overview}</p>
          </div>
        </div>
      </section>

      {show.credits?.cast && show.credits.cast.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-2xl tracking-wide text-mist-100">Cast</h2>
          <CastStrip cast={show.credits.cast} />
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Link href="/indian" className="text-sm font-medium text-mist-400 hover:text-brass-400">
          ← Back to Indian cinema
        </Link>
      </div>
    </div>
  );
}