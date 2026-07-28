class Genre {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Movie {
  constructor(data) {
    this.id = data.id || 0;
    this.title = data.title || "";
    this.overview = data.overview || "";
    this.poster_path = data.poster_path || null;
    this.backdrop_path = data.backdrop_path || null;
    this.release_date = data.release_date || "";
    this.vote_average = data.vote_average || 0;
    this.vote_count = data.vote_count || 0;
    this.genre_ids = data.genre_ids || [];
    this.genres = data.genres || [];
    this.runtime = data.runtime || 0;
    this.tagline = data.tagline || "";
  }
}

class MovieDetail extends Movie {
  constructor(data) {
    super(data); // Movie क्लास की प्रॉपर्टीज को कॉल करने के लिए
    this.genres = data.genres || [];
    this.runtime = data.runtime || 0;
    this.tagline = data.tagline || "";
    this.status = data.status || "";
    this.budget = data.budget || 0;
    this.revenue = data.revenue || 0;
    this.credits = data.credits || { cast: [] };
    this.videos = data.videos || { results: [] };
  }
}

class CastMember {
  constructor(id, name, character, profile_path) {
    this.id = id;
    this.name = name;
    this.character = character;
    this.profile_path = profile_path || null;
  }
}

class Video {
  constructor(id, key, site, type) {
    this.id = id;
    this.key = key;
    this.site = site;
    this.type = type;
  }
}

class MovieListResponse {
  constructor(page, results, total_pages, total_results) {
    this.page = page || 1;
    this.results = results || [];
    this.total_pages = total_pages || 0;
    this.total_results = total_results || 0;
  }
}