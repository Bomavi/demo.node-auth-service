/* root imports: common */
const { jwt, debugLogger } = rootRequire('utils');

const init = async () => {
	const serviceName = `service_${process.env.SERVICE_NAME}`;
	const token = await jwt.issue({ service: serviceName }, null);

	global.SERVICE_NAME = serviceName;
	global.SERVICE_TOKEN = token;

	debugLogger('app', 'SERVICE_NAME: %o', SERVICE_NAME);
	debugLogger('app', 'SERVICE_NAME: %o', SERVICE_TOKEN);
};

module.exports = {
	init,
};
