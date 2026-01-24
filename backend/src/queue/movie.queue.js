let movieQueue = null;

if (process.env.USE_REDIS === "true") {
    const { Queue } = require("bullmq");
    const redisConnection = require("../config/redis");

    movieQueue = new Queue("movie-import-queue", {
        connection: redisConnection,
    });

    console.log("Movie queue initialized");
} else {
    console.log("Movie queue disabled (Redis not enabled)");
}

module.exports = movieQueue;
