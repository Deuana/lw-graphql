import glob from 'glob';

export const configureRoutes = (app) => {
  glob.sync(`${__dirname}/schema/!(base)/controller.js`).forEach((file) => {
    const controller = new (require(file).default)();
    const model = file.replace(/.*schema\/(.*)\/controller.js/, '$1');

    app.post(`/${model}`, async (req, res) => {
      res.json(await controller.create(req.body));
    });

    app.get(`/${model}/:id`, async (req, res) => {
      res.json(await controller.read(req.params.id));
    });

    app.patch(`/${model}/:id`, async (req, res) => {
      res.json(await controller.update(req.params.id, req.body));
    });

    app.delete(`/${model}/:id`, async (req, res) => {
      res.json(await controller.delete(req.params.id));
    });
  });
};
