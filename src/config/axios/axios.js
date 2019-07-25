/* npm imports: common */
const axiosBase = require('axios');

const axios = axiosBase.create({
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use(
	config => {
		config.headers.Authorization = `${SERVICE_NAME}:${SERVICE_TOKEN}`;
		return config;
	},
	error => Promise.reject(error)
);

module.exports = axios;
