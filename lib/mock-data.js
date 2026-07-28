import { Genre, Movie, MovieDetail } from "./types";

// Used only when TMDB_API_KEY is not set, so the app still runs end-to-end
// out of the box. Posters point at placeholder art (no external network
// calls needed) and copy is written fresh, not sourced from any database.

export const MOCK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

const titles = [
  "Neon Horizon", "Glass Orchard", "Midnight Cartographer", "The Last Signal",
  "Salt & Static", "Paper Moons", "Ember Road", "Quiet Machines",
  "The Long Winter Sun", "Copper Sky", "Hollow Point", "Velvet Curfew",
  "Drift Season", "The Cartography of Loss", "Ashfall", "Low Orbit",
  "Wildfire Radio", "The Nightgarden", "Static Bloom", "Iron Tide",
  "Paperweight", "The Second Sun", "Marrow", "Glasshouse",
];

function seededMovie(i) {
  const genrePool = MOCK_GENRES.map((g) => g.id);
  const genre_ids = [
    genrePool[i % genrePool.length],
    genrePool[(i + 3) % genrePool.length],
  ];
  const year = 2014 + (i % 12);
  return {
    id: 100000 + i,
    title: titles[i % titles.length],
    overview:
      "A small crew, a shifting city, and a decision that can't be undone — a character-driven story about what people carry when they can't go home.",
    poster_path: null,
    backdrop_path: null,
    release_date: `${year}-0${(i % 9) + 1}-14`,
    vote_average: 5.5 + ((i * 37) % 45) / 10,
    vote_count: 200 + i * 57,
    genre_ids,
  };
}

export const MOCK_MOVIES = Array.from({ length: 24 }, (_, i) =>
  seededMovie(i)
);

export function getMockDetail(id) {
  const base =
    MOCK_MOVIES.find((m) => m.id === id) ?? seededMovie(id % titles.length);
  const genres = (base.genre_ids ?? []).map(
    (gid) => MOCK_GENRES.find((g) => g.id === gid)
  );
  return {
    ...base,
    genres,
    runtime: 96 + (id % 40),
    tagline: "Some roads only go one way.",
    status: "Released",
    budget: 12000000,
    revenue: 54000000,
    credits: { cast: [] },
    videos: { results: [] },
  };
}