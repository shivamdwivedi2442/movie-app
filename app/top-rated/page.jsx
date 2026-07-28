import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";
import { getTopRated } from "@/lib/tmdb";

export const metadata = {
  title: "Top Rated Movies",
  description:
    "The highest-rated films, ranked by audience score. Discover critically acclaimed movies worth watching tonight.",
  alternates: { canonical: "/top-rated" },
};

export default async function TopRatedPage() {
  const data = await getTopRated();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Critically acclaimed"
        title="Top rated"
        description="The highest audience scores across the catalog, updated regularly."
      />
      <MovieGrid movies={data.results} />
    </div>
  );
}