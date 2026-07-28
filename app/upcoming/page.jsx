import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";
import { getUpcoming } from "@/lib/tmdb";

export const metadata = {
  title: "Upcoming Movies",
  description:
    "See what's coming soon to theaters. Browse upcoming movie releases with posters, ratings, and synopses.",
  alternates: { canonical: "/upcoming" },
};

export default async function UpcomingPage() {
  const data = await getUpcoming();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Mark your calendar"
        title="Upcoming releases"
        description="New titles on their way — check back for release dates and trailers."
      />
      <MovieGrid movies={data.results} />
    </div>
  );
}