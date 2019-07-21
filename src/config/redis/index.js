/* npm imports: common */
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

/* root imports: common */
const { debugLogger } = rootRequire('utils');

const redisClientOptions = {
	host: process.env.REDIS_HOST || '127.0.0.1',
	port: process.env.REDIS_PORT || '6379',
};

const redisClient = redis.createClient(redisClientOptions);

const redisOptions = {
	client: redisClient,
};

redisClient.on('error', err => {
	debugLogger('redis', 'Error: %O', err);
});

module.exports = {
	session,
	redisOptions,
	redisStore,
};
