const express = require("express");
const cors = require("cors");

//exporting routes here ---->
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");


// <-----------------------------------------------

const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API running");
});

//using routes here ---->
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

module.exports = app;
