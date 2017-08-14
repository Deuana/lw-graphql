import express from 'express';
import bodyParser from 'body-parser';

import config from '~/src/config';
import { connectDB } from '~/src/db';
import { configureRoutes } from '~/src/routes';

connectDB();
const app = express();
app.use(bodyParser.json());

configureRoutes(app);

app.listen(config.PORT);
console.warn(`Running server at localhost:${config.PORT}`);
