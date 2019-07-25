const createError = require('http-errors');

/* root imports: common */
const { ApiClient } = rootRequire('config');
const { jwt, debugLogger } = rootRequire('utils');

const apiClient = new ApiClient({ apiPrefix: 'http://proxy/services/api' });

const login = () => async (req, res, next) => {
	const { username = '', password = '', isGuest } = req.body;

	const credentials = {
		username: isGuest ? process.env.GUEST_USERNAME : username,
		password: isGuest ? process.env.GUEST_PASSWORD : password,
		register: false,
	};

	try {
		const user = await apiClient.post('/validate/user', credentials);
		const token = await jwt.issue({ userId: user._id });

		req.session.accessToken = token;
		res.status(200).send(user);
	} catch (e) {
		next(e);
	}
};

const register = () => async (req, res, next) => {
	const { username, password } = req.body;

	const credentials = {
		username,
		password,
		register: true,
	};

	try {
		const user = await apiClient.post('/validate/user', credentials);
		const token = await jwt.issue({ userId: user._id });

		req.session.accessToken = token;
		res.status(200).send(user);
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

const authenticate = () => async (req, res, next) => {
	const { accessToken } = req.session;

	if (!accessToken) return next(createError(401, 'no accessToken provided!'));

	try {
		const { userId } = await jwt.validate(accessToken);
		debugLogger('debug', 'USER ID: %o', userId);
		const user = await apiClient.get(`/users/authenticate/${userId}`);
		res.status(200).send(user);
	} catch (e) {
		next(e);
	}
};

module.exports = {
	login,
	register,
	logout,
	authenticate,
};
