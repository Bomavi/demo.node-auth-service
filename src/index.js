/* npm imports: common */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const cors = require('cors');

/* Declare global rootRequire for "absolute" paths */
global.rootRequire = name => require(`${__dirname}/${name}`);

/* root imports: common */
const { debugLogger } = rootRequire('utils');
const { api } = rootRequire('routes');
const {
	redis: { session, redisOptions, redisStore },
} = rootRequire('config');

/* Get .env constants */
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = isProd ? process.env.PORT : process.env.DEV_PORT;
const maxAge = process.env.SESSION_EXPIRES_IN * 1000 || 3600 * 1000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use CORS in non production env */
// if (!isProd) {
// 	app.options('*', cors({ credentials: true }));
// 	app.use(cors({ credentials: true }));
// }

/* Initialize express-session with REDIS */
app.set('trust proxy', 1);
app.use(
	session({
		store: new redisStore(redisOptions),
		secret: process.env.SESSION_SECRET,
		resave: true,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			maxAge,
			secure: isProd,
		},
	})
);

/* Initialize app routes */
app.use('/services/auth', api());

app.listen(PORT, () => {
	debugLogger('app', `Server is running on port ${PORT}`);
});
