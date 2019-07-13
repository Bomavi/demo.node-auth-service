const express = require('express');
const dotenv = require('dotenv');

/* Declare global rootRequire for "absolute" paths */
global.rootRequire = name => require(`${__dirname}/${name}`);

const { debugLogger } = rootRequire('utils');
const { api } = rootRequire('routes');
const {
	redis: { session, redisOptions, redisStore },
} = rootRequire('config');

/* Get .env constants */
dotenv.config();

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT;
const app = express();

/* Initialize express-session with REDIS */
app.use(
	session({
		store: new redisStore(redisOptions),
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	})
);

/* Initialize app routes */
app.use('/api', api());

app.listen(PORT, () => {
	debugLogger('app', `Server is running on port ${PORT}`);
});
