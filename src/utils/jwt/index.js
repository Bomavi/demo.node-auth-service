/* npm imports: common */
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const defaultExpiration = Number(process.env.SESSION_EXPIRES_IN);
const secret = process.env.JWT_SECRET;

const issue = (payload, isExpires = true) =>
	new Promise((resolve, reject) => {
		const options = {};

		if (!payload) {
			reject('JWT: payload required parameter');
		}

		if (isExpires) options.expiresIn = defaultExpiration;

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});

const validate = token =>
	new Promise((resolve, reject) => {
		if (!token) reject('{ token } required as parameter for token validation');

		JWT.verify(token, secret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		});
	});

module.exports = {
	issue,
	validate,
};
