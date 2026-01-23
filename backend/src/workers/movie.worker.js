const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const Movie = require("../models/Movie");

new Worker(
    "movie-import-queue",
    async (job) => {
        const movieData = job.data;

        const exists = await Movie.findOne({ title: movieData.title });
        if (exists) return;

        const movie = {
            title: movieData.title,
            rating: movieData.rating,
            releaseDate: movieData.releaseDate,
            duration: movieData.duration || 120, 
            description: movieData.overview || "No description available"
        };

        await Movie.create(movie);
        console.log("Inserted:", movie.title);
    },
    {
        connection: redisConnection
    }
);
