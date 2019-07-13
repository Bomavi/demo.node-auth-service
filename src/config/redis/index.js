const { connect, connection } = require('mongoose');
const dotenv = require('dotenv');

const { debugLogger } = rootRequire('utils');

dotenv.config();

const MONGO_DB_HOST =
	process.env.NODE_ENV === 'production' ? process.env.MONGO_DB_HOST : 'mongodb://localhost';
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const DB_NAME = process.env.DB_NAME;
const connectionUrl = `${MONGO_DB_HOST}:${MONGO_DB_PORT}/${DB_NAME}`;
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
};

const mongoConnect = () => {
	connect(
		connectionUrl,
		options
	);

	connection.on('connected', () => {
		debugLogger('mongo', `Mongoose connection is open to: ${connectionUrl}`);
	});

	connection.on('error', e => {
		debugLogger('mongo', `Mongoose connection has occured ${e} error`);
	});

	connection.on('disconnected', () => {
		debugLogger('mongo', 'Mongoose connection was disconnected!');
	});

	process.on('SIGINT', () => {
		connection.close(() => {
			process.exit(0);
		});
	});
};

module.exports = mongoConnect;
