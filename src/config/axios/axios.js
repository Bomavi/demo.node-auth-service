/* npm imports: common */
const axiosBase = require('axios');

const axios = axiosBase.create({
	// baseURL: `http://localhost`,
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use(
	config => {
		// do something
		return config;
	},
	error => Promise.reject(error)
);

module.exports = axios;
