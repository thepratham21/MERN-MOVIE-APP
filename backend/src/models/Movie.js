const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        releaseDate: {
            type: Date,
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        poster: {
            type: String
        }
    },
    { timestamps: true }
);


movieSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Movie", movieSchema);
