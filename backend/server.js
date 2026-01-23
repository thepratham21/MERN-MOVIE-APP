const dotenv = require("dotenv");
require("./src/workers/movie.worker");
dotenv.config();

const connectDB = require("./src/config/database");
const app = require("./src/app");


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
