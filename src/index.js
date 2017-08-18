import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import jwt from 'jwt-express';

import config from '~/src/config';
import { connectDB } from '~/src/db';
import { configureRoutes } from '~/src/routes';

connectDB();
const app = express();
app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwt.init(config.SECRET_KEY));

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
});

configureRoutes(app);

app.listen(config.PORT);
console.warn(`Running server at localhost:${config.PORT}`);
