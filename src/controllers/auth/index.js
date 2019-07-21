/* npm imports: common */
const JWT = require('jsonwebtoken');

/* root imports: common */
const { ApiClient } = rootRequire('config');
const { debugLogger } = rootRequire('utils');

// const isProd = process.env.NODE_ENV === 'production';
// const apiUrl = isProd ? '/api' : 'http://localhost:9000/api';

// const apiClient = new ApiClient({ apiPrefix: 'http://localhost/api' });
const apiClient = new ApiClient({ apiPrefix: '/api' });

const login = () => async (req, res, next) => {
	// debugLogger('debug', `req: %o`, req.body);
	const { username, password, isGuest } = req.body;
	const credentials = {
		username: '',
		password: '',
	};

	if (isGuest) {
		credentials.username = 'guest';
		credentials.password = 'guestPassword';
	} else {
		credentials.username = username;
		credentials.password = password;
	}

	try {
		const response = await apiClient.post('/validate/user', credentials);
		debugLogger('debug', 'Response: %o', response);
		const { userId } = response.data();

		JWT.sign(
			{ userId },
			{ secret: process.env.JWT_SECRET },
			{ expiresIn: process.env.SESSION_EXPIRES_IN },
			(err, token) => {
				if (err) return next(err);
				req.session.cookie.accessToken = token;
				res.status(200).send({ token });
			}
		);
	} catch (e) {
		next(e);
	}
};

const logout = () => async (req, res, next) => {
	try {
		req.session.destroy(err => {
			if (err) return next(err);

			res.status(200).send({ message: 'user was logged out successfuly' });
		});
	} catch (e) {
		next(e);
	}
};

module.exports = {
	login,
	logout,
};
