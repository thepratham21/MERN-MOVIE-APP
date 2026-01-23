const axios = require("axios");

const TMDB_URL = "https://api.themoviedb.org/3/movie/top_rated";

async function fetchTopMoviesFromTMDB() {
    let allMovies = [];

    for (let page = 1; page <= 13; page++) { // ~260 movies
        const response = await axios.get(TMDB_URL, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: "en-US",
                page
            }
        });

        const movies = response.data.results.map((movie) => ({
            title: movie.title,
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            overview: movie.overview
        }));

        allMovies.push(...movies);
    }

    return allMovies;
}

module.exports = { fetchTopMoviesFromTMDB };
