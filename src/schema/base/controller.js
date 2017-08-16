export const route = (method, route) => (
  (target, property, descriptor) => {
    const get = descriptor.value;
    get.route = route;
    get.method = method;
    return { get };
  }
);

export default class BaseController {
  constructor(name, controller, dao) {
    this._name = name;
    this._controller = controller;
    this._dao = dao;
  }

  buildRoutes(app) {
    const { prototype } = this._controller;
    Object.getOwnPropertyNames(prototype)
      .map((methodName) => Object.getOwnPropertyDescriptor(prototype, methodName))
      .filter(descriptor => descriptor.get)
      .forEach(({ get }) => app[get.method](get.route, get.bind(this)));

    const name = this._name;
    app.post(`/${name}`, this.create.bind(this));
    app.patch(`/${name}/:id`, this.update.bind(this));
    app.delete(`/${name}/:id`, this.delete.bind(this));
  }

  async create(req, res) {
    return res.json(await this._dao.create(req.body));
  }

  async update(req, res) {
    return res.json(await this._dao.update(req.params.id, req.body));
  }

  async delete(req, res) {
    return res.json(await this._dao.delete(req.params.id));
  }
}
