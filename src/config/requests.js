const requests = {
  fetchOriginals: `discover/tv`,
  fetchNowPlaying: "movie/now_playing",
  fetchTrendingByDay: "trending/all/day",
  fetchTrendingByWeek: "trending/all/week",
  fetchMoviesInCinemas: "movie/now_playing",
  fetchTopRatedMovies: "movie/top_rated",
  // fetchComedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35`,
  // fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27`,
  // fetchRomanticMovies: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
  // fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
