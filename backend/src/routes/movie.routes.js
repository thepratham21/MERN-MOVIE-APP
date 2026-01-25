const express = require("express");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { fetchTopMoviesFromTMDB } = require("../services/tmdb.service");
const movieQueue = require("../queue/movie.queue");


const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const movies = await Movie.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Movie.countDocuments();

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalMovies: total,
            movies
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin only route --> to create a new movie
router.post("/", auth, role("admin"), async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// search movies by title or description --->
router.get("/search", async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) {
            return res.status(400).json({ message: "Search query required" });
        }

        const movies = await Movie.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ]
        });

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// sorted movies by fields --->
router.get("/sorted", async (req, res) => {
    try {
        const { by = "title", order = "asc" } = req.query;

        const allowedFields = {
            name: "title",
            rating: "rating",
            releaseDate: "releaseDate",
            duration: "duration"
        };

        if (!allowedFields[by]) {
            return res.status(400).json({ message: "Invalid sort field" });
        }

        const sortOrder = order === "desc" ? -1 : 1;

        const movies = await Movie.find().sort({
            [allowedFields[by]]: sortOrder
        });

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single movie by ID (for Edit page)
router.get("/:id", auth, role("admin"), async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Admin only route ---> to update a movie
router.put("/:id", auth, role("admin"), async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin only route ---> to delete a movie
router.delete("/:id", auth, role("admin"), async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Admin only route ---> to import movies from IMDb top 250
router.post("/import/imdb", auth, role("admin"), async (req, res) => {
    try {
        
        if (!movieQueue) {
            return res.status(400).json({
                message: "Movie import is disabled in production",
            });
        }

        const movies = await fetchTopMoviesFromTMDB();

        for (const movie of movies) {
            await movieQueue.add("import-movie", movie);
        }

        res.json({
            message: "TMDB movies queued for import",
            total: movies.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});










module.exports = router;
