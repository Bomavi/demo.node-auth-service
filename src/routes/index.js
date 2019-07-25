/* npm imports: common */
const express = require('express');

/* root imports: common */
const { errorHandler } = rootRequire('middleware');
const { AuthController } = rootRequire('controllers');

const api = () => {
	const router = express();

	router.post('/login', AuthController.login());
	router.post('/register', AuthController.register());
	router.post('/logout', AuthController.logout());
	router.post('/authenticate', AuthController.authenticate());

	router.use(errorHandler);

	return router;
};

module.exports = { api };
