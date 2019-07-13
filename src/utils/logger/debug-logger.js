const debug = require('debug');

module.exports = {
	debugLogger(name, msg, format = '') {
		debug(name)(msg, format);
	},
};
