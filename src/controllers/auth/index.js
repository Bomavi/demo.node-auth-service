const axios = require('axios');
// const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

// dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const apiUrl = isProd ? '/api' : 'http://localhost:9000/api';

const login = () => async (req, res, next) => {
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
		const response = await axios.post(`${apiUrl}/validate/user`, credentials);
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
