const express = require("express");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

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

module.exports = router;
