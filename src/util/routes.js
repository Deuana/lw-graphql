export const addCRUDRoutes = (app, model, dao) => {
  app.post(model, async (req, res) => {
    res.json(await dao.create(req.body));
  });

  app.get(`${model}`/:id`, async (req, res) => {
    res.json(await dao.findOne({ id: req.params.id }));
  });

  app.patch(`${model}`/:id`, async (req, res) => {
    res.json(await dao.update(req.params.id, req.body));
  });

  app.delete(`${model}`/:id`, async (req, res) => {
    res.json(await dao.remove({ id: req.params.id }));
  });
};
