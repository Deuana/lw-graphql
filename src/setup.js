import glob from 'glob';
import nunjucks from 'nunjucks';

import { extractError } from '~/src/utils/errors';

export const configureRoutes = (app) => {
  glob.sync(`${__dirname}/schema/!(base)/controller.js`).forEach((file) => {
    const controller = new (require(file).default)();
    controller.buildRoutes(app);
  });

  app.get('/', (req, res) => (
    req.jwt.payload.id
      ? res.render('index.html')
      : res.redirect('/login')
  ));
};

export const configureNunjucks = (app) => {
  const env = nunjucks.configure('src/templates', {
    autoescape: true,
    express: app,
  });
  env.addFilter('extractError', (errorCode) => extractError(errorCode));
};
