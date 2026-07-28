import { MetadataRoute } from "next";
import { getGenres, getPopular, getTrending } from "@/lib/tmdb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://reelhouse.example.com";

export default async function sitemap() {
  const [genres, trending, popular] = await Promise.all([
    getGenres(),
    getTrending(),
    getPopular(),
  ]);

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/top-rated`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/upcoming`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/genres`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const genreRoutes = genres.map((g) => ({
    url: `${SITE_URL}/genre/${g.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const movieIds = new Set([
    ...trending.results.map((m) => m.id),
    ...popular.results.map((m) => m.id),
  ]);

  const movieRoutes = Array.from(movieIds).map((id) => ({
    url: `${SITE_URL}/movie/${id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...genreRoutes, ...movieRoutes];
}