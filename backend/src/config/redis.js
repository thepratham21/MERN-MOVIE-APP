const { Redis } = require("ioredis");

const redisConnection = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null
});

redisConnection.on("connect", () => {
    console.log("Redis connected");
});

redisConnection.on("error", (err) => {
    console.error("Redis error:", err.message);
});

module.exports = redisConnection;
