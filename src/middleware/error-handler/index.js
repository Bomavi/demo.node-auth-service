const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');

const { debugLogger } = rootRequire('utils');

const errorHandler = (err, _req, res, _next) => {
	const error = err.status === 401 || err instanceof APIError ? err : new InternalServerError();

	if (process.env.NODE_ENV !== 'production') {
		debugLogger('error', 'API error: %O', err);
	}

	if (['ValidationError', 'UserExistsError'].includes(err.name)) {
		// if it special error
		return res.status(405).json(err);
	}

	// log error if needed
	// debugLogger('error', 'API error: %O', err);

	return res // return 500 for user
		.status(error.status || 500)
		.json({
			code: error.code || 500,
			message: error.message || STATUS_CODES[error.status],
		});
};

module.exports = errorHandler;
