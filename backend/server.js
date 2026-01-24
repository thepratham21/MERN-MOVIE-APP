const dotenv = require("dotenv");

if (process.env.USE_REDIS === "true") {
    require("./workers/movie.worker");
    console.log("Redis worker started");
} else {
    console.log("Redis worker disabled");
}

dotenv.config();

const connectDB = require("./src/config/database");
const app = require("./src/app");


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
