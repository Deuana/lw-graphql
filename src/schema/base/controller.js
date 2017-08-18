import { userLogged } from '~/src/utils/auth';

export const route = (method, path, auth = userLogged) => (
  (target, property, descriptor) => {
    async function get(req, res) {
      try {
        auth(req);
        await descriptor.value.bind(this)(req, res);
      } catch(e) {
        const [code, message] = e.message.split(':');
        res.status(code).send(message);
      }
    }
    get.route = path;
    get.method = method;
    return { get };
  }
);

export default class BaseController {
  buildRoutes(app) {
    const { prototype } = this._controller;
    Object.getOwnPropertyNames(prototype)
      .map(methodName => Object.getOwnPropertyDescriptor(prototype, methodName))
      .filter(descriptor => descriptor.get)
      .forEach(({ get }) => app[get.method](get.route, get.bind(this)));

    const name = this._name;
    app.patch(`/${name}/:id`, this.update.bind(this));
    app.delete(`/${name}/:id`, this.delete.bind(this));
  }

  async update(req, res) {
    return res.json(await this._dao.update(req.params.id, req.body));
  }

  async delete(req, res) {
    return res.json(await this._dao.delete(req.params.id));
  }
}
