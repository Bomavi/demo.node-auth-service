const express = require('express');
const dotenv = require('dotenv');

/* Declare global rootRequire for "absolute" paths */
global.rootRequire = name => require(`${__dirname}/${name}`);

const { debugLogger } = rootRequire('utils');
const { api } = rootRequire('routes');
// const { mongoConnect } = rootRequire('config');

/* Get .env constants */
dotenv.config();

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT;
const app = express();

/* Initialize REDIS configuration */
// mongoConnect();

/* Initialize app routes */
app.use('/api', api());

app.listen(PORT, () => {
	debugLogger('app', `Server is running on port ${PORT}`);
});
