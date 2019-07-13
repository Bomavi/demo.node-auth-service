const express = require('express');

const { errorHandler } = rootRequire('middleware');
const { Auth } = rootRequire('models');
const { AuthController } = rootRequire('controllers');

const models = { Auth };

const api = () => {
	const router = express();

	router.use('/login', AuthController(models));
	router.use(errorHandler);

	return router;
};

module.exports = { api };
