/* local imports: common */
const axios = require('./axios');

module.exports = class ApiClient {
	constructor({ apiPrefix }) {
		if (!apiPrefix) {
			throw new Error('[apiPrefix] required');
		}

		this.prefix = apiPrefix;
	}

	get(url, params = {}, options = {}) {
		return this.request({
			url,
			params,
			options,
			method: 'get',
		});
	}

	put(url, body = {}, params = {}, options = {}) {
		return this.request({
			url,
			body,
			params,
			options,
			method: 'put',
		});
	}

	patch(url, body = {}) {
		return this.request({
			url,
			body,
			method: 'patch',
		});
	}

	post(url, body = {}, params = {}, options = {}) {
		return this.request({
			url,
			body,
			params,
			options,
			method: 'post',
		});
	}

	delete(url, params = {}) {
		return this.request({
			url,
			params,
			method: 'delete',
		});
	}

	async request({ url, method, params, body, options }) {
		return axios({
			method,
			url,
			params,
			baseURL: this.prefix,
			data: body,
			options,
		})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				const res = error.response;
				if (!res) {
					console.error(error);
					throw new Error(error);
				}
				if (res.status >= 400) {
					const serverError = new Error(error);

					serverError.res = res;

					throw serverError;
				}
			});
	}
};
