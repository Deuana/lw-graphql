import glob from 'glob';

export const configureRoutes = (app) => {
  glob.sync(`${__dirname}/schema/!(base)/controller.js`).forEach((file) => {
    const controller = new (require(file).default)();
    controller.buildRoutes(app);
  });
};
