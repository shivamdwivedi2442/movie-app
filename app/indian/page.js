import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import IndustryCapsules from "@/components/IndustryCapsules"
import {
  getIndianTrending,
  getIndianTopRated,
  getMoviesByIndustry,
  getIndianWebSeries,
} from "@/lib/tmdb";

export const metadata = {
  title: "Indian Cinema",
  description:
    "Trending and top-rated Indian movies, Bollywood, South Indian cinema, and web series — all in one place.",
  alternates: { canonical: "/indian" },
};

const CATEGORIES = [
  { key: "trending", label: "Trending" },
  { key: "topRated", label: "Top Rated" },
  { key: "bollywood", label: "Bollywood" },
  { key: "south", label: "South Indian" },
  { key: "webSeries", label: "Web Series" },
];

export default async function IndianMoviesPage() {
  const [trending, topRated, bollywood, south, webSeries] = await Promise.all([
    getIndianTrending(),
    getIndianTopRated(),
    getMoviesByIndustry("bollywood"),
    getMoviesByIndustry("south"),
    getIndianWebSeries(),
  ]);

  const data = {
    trending: trending.results,
    topRated: topRated.results,
    bollywood: bollywood.results,
    south: south.results,
    webSeries: webSeries.results,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="From home"
        title="Indian cinema"
        description="Trending and top-rated titles, plus Bollywood, South Indian cinema, and web series. Web series open on TMDB — a dedicated page is coming soon."
      />
      <IndustryCapsules data={data} industries={CATEGORIES} />
    </div>
  );
}
