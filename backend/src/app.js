const express = require("express");
const cors = require("cors");

//exporting routes here ---->
const authRoutes = require("./routes/auth.routes");


// <-----------------------------------------------

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API running");
});

//using routes here ---->
app.use("/api/auth", authRoutes);

module.exports = app;
