const dotenv = require('dotenv');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

const { debugLogger } = rootRequire('utils');

dotenv.config();

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
