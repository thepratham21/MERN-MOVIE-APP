const { Redis } = require('ioredis');

let redisConnection = null;

// Environment variables are always strings; check for 'true'
if (process.env.USE_REDIS === 'true') {
    redisConnection = new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        maxRetriesPerRequest: null,
    });

    // Attach listeners only if the connection is created
    redisConnection.on('connect', () => {
        console.log('Redis connected');
    });

    redisConnection.on('error', (err) => {
        console.error('Redis error:', err.message);
    });
} else {
    // If USE_REDIS is not 'true', no instance is created and no connection starts
    console.log('Redis is disabled');
}

module.exports = redisConnection;