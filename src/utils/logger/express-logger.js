/* npm imports: common */
const pino = require('express-pino-logger');

const expressLogger = pino({
	prettyPrint: {
		colorize: true,
		translateTime: 'HH:MM:ss',
		ignore: 'pid,hostname',
	},
});

module.exports = expressLogger;
