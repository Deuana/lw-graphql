import glob from 'glob';

export const configureRoutes = (app) => {
  glob.sync(`${__dirname}/schema/!(base)/controller.js`).forEach((file) => {
    const controller = new (require(file).default)();
    controller.buildRoutes(app);
  });

  app.get('/', (req, res) => {
    if (!req.jwt.payload.id) {
      return res.render('user/login.html');
    }

    return res.render('index.html');
  });
};
