import { MOCK_GENRES, MOCK_MOVIES, getMockDetail } from "./mock-data";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const USING_MOCK = !API_KEY;

export const IMG = {
  poster: (path, size = "w500") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  backdrop: (path, size = "w1280") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  profile: (path) =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : null,
};

async function tmdbFetch(
  path,
  params = {},
  revalidate = 3600
) {
  if (!API_KEY) {
    console.warn(
      "[tmdb] TMDB_API_KEY is not set — falling back to sample data. Add it to .env.local and restart the dev server."
    );
    return null;
  }
  const search = new URLSearchParams({ api_key: API_KEY, ...params });
  try {
    const res = await fetch(`${BASE_URL}${path}?${search.toString()}`, {
      next: { revalidate },
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[tmdb] Request to ${path} failed: ${res.status} ${res.statusText} — ${body}`
      );
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`[tmdb] Network error calling ${path}:`, err);
    return null;
  }
}

export function isUsingMockData() {
  return USING_MOCK;
}

export async function getTrending() {
  const data = await tmdbFetch("/trending/movie/week");
  if (data) return data;
  return { page: 1, results: MOCK_MOVIES.slice(0, 12), total_pages: 1, total_results: 12 };
}

export async function getPopular(page = 1) {
  const data = await tmdbFetch("/movie/popular", {
    page: String(page),
  });
  if (data) return data;
  return { page, results: MOCK_MOVIES, total_pages: 3, total_results: MOCK_MOVIES.length };
}

export async function getTopRated() {
  const data = await tmdbFetch("/movie/top_rated");
  if (data) return data;
  const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
  return { page: 1, results: sorted.slice(0, 12), total_pages: 1, total_results: 12 };
}

export async function getUpcoming() {
  const data = await tmdbFetch("/movie/upcoming");
  if (data) return data;
  return { page: 1, results: MOCK_MOVIES.slice(6, 18), total_pages: 1, total_results: 12 };
}

export async function getGenres() {
  const data = await tmdbFetch("/genre/movie/list");
  if (data) return data.genres;
  return MOCK_GENRES;
}

export async function getMoviesByGenre(
  genreId,
  page = 1
) {
  const data = await tmdbFetch("/discover/movie", {
    with_genres: String(genreId),
    page: String(page),
    sort_by: "popularity.desc",
  });
  if (data) return data;
  const filtered = MOCK_MOVIES.filter((m) => m.genre_ids?.includes(genreId));
  return { page, results: filtered, total_pages: 1, total_results: filtered.length };
}

export async function getIndianMovies(page = 1) {
  const data = await tmdbFetch("/discover/movie", {
    with_origin_country: "IN",
    sort_by: "popularity.desc",
    page: String(page),
  });
  if (data) return data;
  return { page, results: MOCK_MOVIES.slice(4, 16), total_pages: 1, total_results: 12 };
}

export async function searchMovies(
  query,
  page = 1
) {
  if (!query.trim()) return { page: 1, results: [], total_pages: 0, total_results: 0 };
  const data = await tmdbFetch("/search/movie", {
    query,
    page: String(page),
  });
  if (data) return data;
  const q = query.toLowerCase();
  const filtered = MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q));
  return { page: 1, results: filtered, total_pages: 1, total_results: filtered.length };
}

export async function getMovieDetail(id) {
  const data = await tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,videos",
  });
  if (data) return data;
  return getMockDetail(id);
}