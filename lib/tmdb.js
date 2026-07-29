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

async function tmdbFetch(path, params = {}, revalidate = 3600) {
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

export async function getMoviesByGenre(genreId, page = 1) {
  const data = await tmdbFetch("/discover/movie", {
    with_genres: String(genreId),
    page: String(page),
    sort_by: "popularity.desc",
  });
  if (data) return data;
  const filtered = MOCK_MOVIES.filter((m) => m.genre_ids?.includes(genreId));
  return { page, results: filtered, total_pages: 1, total_results: filtered.length };
}

export async function getIndianTrending(page = 1) {
  return getIndianMovies(page); // popularity-sorted Indian movies, reused as "trending"
}

export async function getIndianTopRated(page = 1) {
  const data = await tmdbFetch("/discover/movie", {
    with_origin_country: "IN",
    sort_by: "vote_average.desc",
    "vote_count.gte": "100",
    page: String(page),
  });
  if (data) return data;
  const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
  return { page: 1, results: sorted.slice(0, 12), total_pages: 1, total_results: 12 };
}

// Indian web series (TMDB "tv" media type). TMDB excludes adult content from
// this catalog by default — no adult/explicit filter is exposed here.
export async function getIndianWebSeries(page = 1) {
  const data = await tmdbFetch("/discover/tv", {
    with_origin_country: "IN",
    sort_by: "popularity.desc",
    page: String(page),
  });
  if (!data) {
    return { page, results: MOCK_MOVIES.slice(2, 14), total_pages: 1, total_results: 12 };
  }
  // Normalize TV shape (name/first_air_date) to the Movie shape the UI expects.
  const results = data.results.map((show) => ({
    id: show.id,
    title: show.name,
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    release_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    media_type: "tv",
  }));
  return { page: data.page, results, total_pages: data.total_pages, total_results: data.total_results };
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

// Industry / language capsules — powers the "browse by industry" pill bar.
// TMDB's discover endpoint only accepts ONE value for with_original_language,
// so "South Indian" (which spans 4 languages) runs parallel requests and merges.
const INDUSTRY_LANGUAGE_MAP = {
  hollywood: ["en"],
  bollywood: ["hi"],
  tollywood: ["te"],
  kollywood: ["ta"],
  south: ["te", "ta", "ml", "kn"], // Telugu, Tamil, Malayalam, Kannada combined
  korean: ["ko"],
  japanese: ["ja"],
};

export const INDUSTRIES = [
  { key: "hollywood", label: "Hollywood" },
  { key: "bollywood", label: "Bollywood" },
  { key: "tollywood", label: "Tollywood" },
  { key: "kollywood", label: "Kollywood" },
  { key: "south", label: "South Indian" },
  { key: "korean", label: "Korean" },
  { key: "japanese", label: "Japanese" },
];

export async function getMoviesByIndustry(industryKey, page = 1) {
  const languages = INDUSTRY_LANGUAGE_MAP[industryKey] ?? ["en"];

  if (languages.length === 1) {
    const data = await tmdbFetch("/discover/movie", {
      with_original_language: languages[0],
      sort_by: "popularity.desc",
      page: String(page),
    });
    if (data) return data;
    return { page, results: MOCK_MOVIES.slice(0, 12), total_pages: 1, total_results: 12 };
  }

  // Multi-language industry (e.g. South Indian): fetch each language, merge, re-sort.
  const responses = await Promise.all(
    languages.map((lang) =>
      tmdbFetch("/discover/movie", {
        with_original_language: lang,
        sort_by: "popularity.desc",
        page: "1",
      })
    )
  );

  const merged = responses.flatMap((r) => r?.results ?? []);
  if (merged.length === 0) {
    return { page: 1, results: MOCK_MOVIES.slice(0, 12), total_pages: 1, total_results: 12 };
  }

  const deduped = Array.from(new Map(merged.map((m) => [m.id, m])).values()).sort(
    (a, b) => b.vote_average - a.vote_average
  );

  return { page: 1, results: deduped, total_pages: 1, total_results: deduped.length };
}

// Fetches every industry in parallel — used to pre-load all capsule tabs
// server-side so switching tabs client-side is instant (no re-fetch on click).
export async function getAllIndustries() {
  const entries = await Promise.all(
    INDUSTRIES.map(async (industry) => [industry.key, await getMoviesByIndustry(industry.key)])
  );
  return Object.fromEntries(entries);
}

export async function searchMovies(query, page = 1) {
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

export async function getTVDetail(id) {
  const data = await tmdbFetch(`/tv/${id}`, {
    append_to_response: "credits,videos",
  });
  if (!data) return null;
  // Normalize TV shape to match the Movie/MovieDetail shape the UI expects.
  return {
    id: data.id,
    title: data.name,
    overview: data.overview,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    release_date: data.first_air_date,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    genres: data.genres || [],
    runtime: data.episode_run_time?.[0] || 0,
    tagline: data.tagline || "",
    status: data.status,
    numberOfSeasons: data.number_of_seasons,
    numberOfEpisodes: data.number_of_episodes,
    credits: data.credits,
    videos: data.videos,
    media_type: "tv",
  };
}