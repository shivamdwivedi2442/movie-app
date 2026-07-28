import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import SectionHeader from "@/components/SectionHeader";
import { getPopular, getTopRated, getTrending, getUpcoming } from "@/lib/tmdb";

export default async function HomePage() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getUpcoming(),
  ]);

  const featured = trending.results[0];

  return (
    <>
      {featured && <Hero movie={featured} />}

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <section aria-labelledby="trending-heading">
          <div className="mb-6 flex items-end justify-between">
            <SectionHeader eyebrow="This week" title="Trending now" />
          </div>
          <MovieGrid movies={trending.results.slice(1, 11)} />
        </section>

        <section aria-labelledby="popular-heading">
          <div className="mb-6 flex items-end justify-between">
            <SectionHeader eyebrow="Crowd favorites" title="Popular picks" />
            <Link
              href="/genres"
              className="hidden items-center gap-1 text-sm font-medium text-mist-400 hover:text-brass-400 sm:flex"
            >
              Browse by genre <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <MovieGrid movies={popular.results.slice(0, 10)} />
        </section>

        <section aria-labelledby="top-rated-heading">
          <SectionHeader eyebrow="Critically acclaimed" title="Top rated" />
          <MovieGrid movies={topRated.results.slice(0, 10)} />
        </section>

        <section aria-labelledby="upcoming-heading">
          <div className="mb-6 flex items-end justify-between">
            <SectionHeader eyebrow="Coming soon" title="Upcoming releases" />
            <Link
              href="/upcoming"
              className="hidden items-center gap-1 text-sm font-medium text-mist-400 hover:text-brass-400 sm:flex"
            >
              See all <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <MovieGrid movies={upcoming.results.slice(0, 10)} />
        </section>
      </div>
    </>
  );
}