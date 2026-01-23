const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const movieQueue = new Queue("movie-import-queue", {
    connection: redisConnection
});

module.exports = movieQueue;
